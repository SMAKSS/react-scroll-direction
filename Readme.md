# React Scroll Direction Hook

![npm](https://img.shields.io/npm/v/@smakss/react-scroll-direction) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@smakss/react-scroll-direction) ![NPM](https://img.shields.io/npm/l/@smakss/react-scroll-direction) ![npm](https://img.shields.io/npm/dt/@smakss/react-scroll-direction) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@smakss/react-scroll-direction)

Detect scroll direction in your React applications effortlessly using `@smakss/react-scroll-direction`, a custom React Hook with an adjustable threshold.

This package was inspired by a [popular StackOverflow answer](https://stackoverflow.com/a/62497293/11908502), crafted to be a ready-to-use solution for detecting scroll direction in your React applications.

## Demo

Click the button below to view a demo on CodeSandbox:

[![View @smakss/search](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-scroll-direction-tclwvp?fontsize=14&hidenavigation=1&theme=dark)

## Installation

Install the package using npm or yarn:

```bash
npm install @smakss/react-scroll-direction
# or
yarn add @smakss/react-scroll-direction
```

To include it in your project, use:

CommonJS:

```js
const { useDetectScroll } = require("@smakss/react-scroll-direction");
```

ES Module:

```js
import { useDetectScroll } from "@smakss/react-scroll-direction";
```

## Usage

The `useDetectScroll` custom hook accepts an options object with the following properties:

- `thr`: Threshold to trigger scroll direction change (default: `0`, only accepts positive values).
- `axis`: Scroll axis (`"y"` or `"x"`, default: `"y"`).
- `scrollUp`: Output value when scrolling up or left (default: `"up"` for y-axis, `"left"` for x-axis).
- `scrollDown`: Output value when scrolling down or right (default: `"down"` for y-axis, `"right"` for x-axis).
- `still`: Output value when no scrolling is detected (default: `"still"`).

## Examples

Detecting scroll up/down:

```js
const scrollDir = useDetectScroll({});

// Outputs: "up", "down", or "still"
```

Detecting scroll left/right:

```js
const scrollDir = useDetectScroll({ axis: "x" });

// Outputs: "left", "right", or "still"
```
