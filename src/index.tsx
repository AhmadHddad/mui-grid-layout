import styled from '@emotion/styled';
import { classNames, joinObjects, cssPropertiesToString } from 'hd-utils';
import {
  ComponentProps,
  CSSProperties,
  createElement,
  forwardRef,
  useMemo,
  ElementType,
} from 'react';

export interface BreakpointSizes {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  [key: string]: string | undefined;
}

export type GridProps<
  K extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements
> = {
  container?: boolean;
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  sx?: Partial<CSSProperties>;
  spacing?: number;
  gap?: number;
  placeItems?: CSSProperties['placeItems'];
  placeContent?: CSSProperties['placeContent'];
  display?: CSSProperties['display'];
  boxSizing?: CSSProperties['boxSizing'];
  flexGrow?: CSSProperties['flexGrow'];
  flexBasis?: CSSProperties['flexBasis'];
  flexDirection?: CSSProperties['flexDirection'];
  flexWrap?: CSSProperties['flexWrap'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  alignContent?: CSSProperties['alignContent'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  background?: CSSProperties['background'];
  backgroundColor?: CSSProperties['backgroundColor'];
  backgroundImage?: CSSProperties['backgroundImage'];
  maxWidth?: CSSProperties['maxWidth'];
  maxHeight?: CSSProperties['maxHeight'];
  minWidth?: CSSProperties['minWidth'];
  minHeight?: CSSProperties['minHeight'];
  color?: CSSProperties['color'];
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
  lineHeight?: CSSProperties['lineHeight'];
  position?: CSSProperties['position'];
  zIndex?: CSSProperties['zIndex'];
  fontFamily?: CSSProperties['fontFamily'];
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'] | number;
  paddingBlock?: CSSProperties['paddingBlock'] | number;
  paddingInline?: CSSProperties['paddingInline'] | number;
  marginBlock?: CSSProperties['marginBlock'] | number;
  marginInline?: CSSProperties['marginInline'] | number;
  breakpoints?: BreakpointSizes;
  component?: K | ElementType;
} & ComponentProps<K>;

export type Grid = React.FC<GridProps>;

const gridRootClassName = '_grid-root';
const gridItemClassName = '_grid-item';
const gridContainerClassName = '_grid-container';

const defaultBreakpoints: BreakpointSizes = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const condition = (con: unknown, st?: any, fallback = '') =>
  con ? st : fallback;

function handleStyle(val: string | number, multi?: boolean) {
  return typeof val === 'number' ? `${multi ? val * 8 : val}px` : val;
}

function handleBreakpoints(
  BreakpointSizes: Record<string, number | undefined>,
  breakpoints?: BreakpointSizes
) {
  const activeBreakpoints = joinObjects<BreakpointSizes>(
    defaultBreakpoints,
    breakpoints
  );
  let str = '';

  for (const [breakpoint, value] of Object.entries(BreakpointSizes)) {
    if (value !== undefined) {
      const minWidth = activeBreakpoints[breakpoint];

      if (minWidth) {
        const calc = (value / 12) * 100;

        str += `@media (min-width: ${minWidth}) { & { 
              flex-basis: calc(${calc}%); max-width: calc(${calc}%);
           }}`;
      }
    }
  }

  return str;
}

function makeStyle<K extends keyof JSX.IntrinsicElements>(
  props: Partial<GridProps<K>>
) {
  const styles = `
        box-sizing: border-box;
        margin: 0;
        flex-grow: 0;

        gap: ${condition(props.gap, handleStyle(props.gap!))};
        display: ${condition(props.display, props.display)};
        box-sizing: ${condition(props.boxSizing, props.boxSizing)};
        place-items: ${condition(props.placeItems, props.placeItems )};
        place-content: ${condition(props.placeContent, props.boxSizing)};
        flex-direction: ${condition(props.flexDirection, props.flexDirection)};
        flex-basis: ${condition(props.flexBasis, props.flexBasis)};
        flex-grow: ${condition(props.flexGrow, props.flexGrow)};
        flex-wrap: ${condition(props.flexWrap, props.flexWrap)};
        justify-content: ${condition(
          props.justifyContent,
          props.justifyContent
        )};
        align-items: ${condition(props.alignItems, props.alignItems)};
        align-content: ${condition(props.alignContent, props.alignContent)};
        width: ${condition(props.width, props.width)};
        height: ${condition(props.height, props.height)};
        background: ${condition(props.background, props.background)};
        background-color: ${condition(
          props.backgroundColor,
          props.backgroundColor
        )};
        background-image: ${condition(
          props.backgroundImage,
          props.backgroundImage
        )};
        max-width: ${condition(props.maxWidth, props.maxWidth)};
        max-height: ${condition(props.maxHeight, props.maxHeight)};
        min-width: ${condition(props.minWidth, props.minWidth)};
        min-height: ${condition(props.minHeight, props.minHeight)};
        color: ${condition(props.color, props.color)};
        font-size: ${condition(props.fontSize, props.fontSize)};
        font-weight: ${condition(props.fontWeight, props.fontWeight)};
        line-height: ${condition(props.lineHeight, props.lineHeight)};
        position: ${condition(props.position, props.position)};
        z-index: ${condition(props.zIndex, props.zIndex)};
        font-family: ${condition(props.fontFamily, props.fontFamily)};
        margin: ${condition(props.margin, handleStyle(props.margin!, true))};
        padding: ${condition(props.padding, handleStyle(props.padding!, true))};
        padding-block: ${condition(
          props.paddingBlock,
          handleStyle(props.paddingBlock!, true)
        )};
        padding-inline: ${condition(
          props.paddingInline,
          handleStyle(props.paddingInline!, true)
        )};
        margin-block: ${condition(
          props.marginBlock,
          handleStyle(props.marginBlock!, true)
        )};
        margin-inline: ${condition(
          props.marginInline,
          handleStyle(props.marginInline!, true)
        )};
        ${condition(props.sx, cssPropertiesToString(props.sx))}
        `;

  const breakpoints = handleBreakpoints({
    xs: props.xs,
    sm: props.sm,
    md: props.md,
    lg: props.lg,
  });

  const containerStyle = condition(
    props.container,
    `
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  `
  );

  const containerSpacing = condition(
    props.container && props.spacing,
    `
                width:calc(100% + ${handleStyle(props.spacing!, true)});
                margin-top: -${handleStyle(props.spacing!, true)}; 
                margin-left: -${handleStyle(props.spacing!, true)};
                & > .${gridItemClassName} {
                  padding-top: ${handleStyle(
                    props.spacing!,
                    true
                  )}; padding-left: ${handleStyle(props.spacing!, true)};
                }
              `
  );

  return `${containerStyle} ${containerSpacing} ${styles} ${breakpoints}`;
}

function GridC<K extends keyof JSX.IntrinsicElements>(
  {
    container,
    item = true,
    xs,
    sm,
    md,
    lg,
    sx,
    spacing,
    gap,
    display,
    boxSizing,
    flexGrow,
    flexBasis,
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    alignContent,
    width,
    height,
    background,
    backgroundColor,
    backgroundImage,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    color,
    fontSize,
    fontWeight,
    lineHeight,
    position,
    zIndex,
    fontFamily,
    margin,
    padding,
    paddingBlock,
    paddingInline,
    marginBlock,
    marginInline,
    breakpoints,
    component,
    ...props
  }: GridProps<K>,
  ref: K
) {
  const styles = useMemo(
    () =>
      makeStyle<K>({
        container,
        item,
        xs,
        sm,
        md,
        lg,
        sx,
        spacing,
        gap,
        display,
        boxSizing,
        flexGrow,
        flexBasis,
        flexDirection,
        flexWrap,
        justifyContent,
        alignItems,
        alignContent,
        width,
        height,
        background,
        backgroundColor,
        backgroundImage,
        maxWidth,
        maxHeight,
        minWidth,
        minHeight,
        color,
        fontSize,
        fontWeight,
        lineHeight,
        position,
        zIndex,
        fontFamily,
        margin,
        padding,
        paddingBlock,
        paddingInline,
        marginBlock,
        marginInline,
        breakpoints,
      } as Partial<GridProps<K>>),
    [
      alignContent,
      alignItems,
      background,
      backgroundColor,
      backgroundImage,
      boxSizing,
      breakpoints,
      color,
      container,
      display,
      flexBasis,
      flexDirection,
      flexGrow,
      flexWrap,
      fontFamily,
      fontSize,
      fontWeight,
      gap,
      height,
      item,
      justifyContent,
      lg,
      lineHeight,
      margin,
      marginBlock,
      marginInline,
      maxHeight,
      maxWidth,
      md,
      minHeight,
      minWidth,
      padding,
      paddingBlock,
      paddingInline,
      position,
      sm,
      spacing,
      sx,
      width,
      xs,
      zIndex,
    ]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ele = (styled as any)(component || ('div' as any))`
    ${styles}
  `;

  props.ref = ref as ComponentProps<K>['ref'];

  props.className = classNames(
    props.className,
    item && gridItemClassName,
    container && gridContainerClassName,
    gridRootClassName
  );
  return createElement(ele, props);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Grid: Grid = (forwardRef<HTMLElement, GridProps>(
  GridC as any
) as unknown) as Grid;

export default Grid;
