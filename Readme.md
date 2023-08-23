# React Scroll Direction Hook

![npm](https://img.shields.io/npm/v/@smakss/react-scroll-direction) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@smakss/react-scroll-direction) ![NPM](https://img.shields.io/npm/l/@smakss/react-scroll-direction) ![npm](https://img.shields.io/npm/dt/@smakss/react-scroll-direction) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@smakss/react-scroll-direction)

`@smakss/react-scroll-direction` is a versatile, lightweight React hook that detects scroll direction in your application with ease. You can fine-tune its sensitivity using an adjustable threshold, catering to your application's unique needs.

This package originated from a [popular StackOverflow response](https://stackoverflow.com/a/62497293/11908502) and has been developed further into a ready-to-implement solution for managing scroll direction detection in your React applications.

## Demo

Experience `@smakss/react-scroll-direction` in action on CodeSandbox:

[![View @smakss/search](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-scroll-direction-tclwvp?fontsize=14&hidenavigation=1&theme=dark)

## Installation

Install `@smakss/react-scroll-direction` via npm or yarn:

```bash
npm install @smakss/react-scroll-direction
# or
yarn add @smakss/react-scroll-direction
```

Then, import it into your project:

CommonJS:

```js
const useDetectScroll = require("@smakss/react-scroll-direction");
```

ES Module:

```js
import useDetectScroll from "@smakss/react-scroll-direction";
```

For TypeScript projects, import the hook and its types:

```ts
import useDetectScroll, {
  Axis,
  Direction,
} from "@smakss/react-scroll-direction";
```

## Usage

The `useDetectScroll` hook takes an options object that can include the following properties:

- `thr`: Threshold for scroll direction change detection (default: `0`, accepts only positive values).
- `axis`: Defines the scroll axis (`"y"` or `"x"`, default: `"y"`).
- `scrollUp`: Value returned when scrolling up (y-axis) or left (x-axis) (default: `"up"` for y-axis, `"left"` for x-axis).
- `scrollDown`: Value returned when scrolling down (y-axis) or right (x-axis) (default: `"down"` for y-axis, `"right"` for x-axis).
- `still`: Value returned when there's no scrolling activity (default: `"still"`).

## Examples

To detect upward or downward scroll:

```js
const scrollDir = useDetectScroll();

// Returns: "up", "down", or "still"
```

To detect left or right scroll:

```js
const scrollDir = useDetectScroll({ axis: "x" });

// Returns: "left", "right", or "still"
```
