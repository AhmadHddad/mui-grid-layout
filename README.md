<div align = "center">
   <h1 align = "center">
    mui-grid-layout
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/package/mui-grid-layout">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/mui-grid-layout?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/mui-grid-layout">
    <img alt="Types" src="https://img.shields.io/npm/types/react-use-system-color-mode?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/mui-grid-layout">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/mui-grid-layout?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="UnLicense" src="https://img.shields.io/npm/l/@reactuses/core?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i mui-grid-layout</pre>

<p align="center">
A lightweight and customizable grid layout component for React, inspired by Material-UI's Grid system, but without the need to install the entire Material-UI library.
</p>

<hr>


## Installation

```bash
npm install mui-grid-layout
```

## Usage

Import the MuiGridLayout component in your React application and use it to create flexible grid layouts.

```
import React from 'react';
import MuiGridLayout from 'mui-grid-layout';

const YourComponent = () => {
  return (
    <MuiGridLayout container spacing={2}>
      <MuiGridLayout item xs={12} sm={6} md={4}>
        {/* Your content goes here */}
      </MuiGridLayout>
      <MuiGridLayout item xs={12} sm={6} md={4}>
        {/* Your content goes here */}
      </MuiGridLayout>
      <MuiGridLayout item xs={12} sm={6} md={4}>
        {/* Your content goes here */}
      </MuiGridLayout>
    </MuiGridLayout>
  );
};

export default YourComponent;
```
