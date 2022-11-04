# Detect react scroll direction

![npm](https://img.shields.io/npm/v/@smakss/react-scroll-direction) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@smakss/react-scroll-direction) ![NPM](https://img.shields.io/npm/l/@smakss/react-scroll-direction) ![npm](https://img.shields.io/npm/dt/@smakss/react-scroll-direction) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@smakss/react-scroll-direction)

This is a custom hook for react which is useful to detect scroll direction in React applications in an efficient way with a custom threshold.

This package is created on behalf of a [StackOverflow answer](https://stackoverflow.com/a/62497293/11908502) which draws some attention to itself, so if someone just wants something to work with right away, they can access it easily here.

## How it works?

To install it you can simply do the following command:

```bash
npm i @smakss/react-scroll-direction
or
yarn add @smakss/react-scroll-direction
```

to include it with common js module you should do this:

```js
var { useDetectScroll } = require("@smakss/react-scroll-direction");
```

and to include it with ECMAscript module you can simply do this one:

```js
import { useDetectScroll } from "@smakss/react-scroll-direction";
```

then to use it within your application you can do it just like below:

The useDetectScroll custom hook will accept 3 input parameter:

- `thr` (`number`): A number to indicate the threshold of firing scroll direction event, which is `0` by default and only accepts a positive numeric value. If it gets a higher value the steps will be longer.
- `axis` (`string`): Indicate the page scroll axis, whether, in the `y` or `x` axes, it is `y` by default.
- `scrollUp` (`string`): A string value for the output of the custom hook if the scroll direction is upward. The default value is `up` if the axis is `y` and `left` if the axis is `x`.
- `scrollDown` (`string`): A string value for the output of the custom hook if the scroll direction is downward. The default value is `down` if the axis is `y` and `right` if the axis is `x`.
- `still` (`string`): default value for the direction when there is no scrolling happening on the page. The default value is `still`.

## Examples of usage

### If the scroll goes upward/downward

```js
const [scrollDir] = useDetectScroll({});

// scrollDir: "up"/"down"
```

### If the scroll goes left/right

```js
const [scrollDir] = useDetectScroll({ axis: "x" });

// scrollDir: "left"/"right"
```

## Demo

[![View @smakss/search](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-scroll-direction-tclwvp?fontsize=14&hidenavigation=1&theme=dark)
