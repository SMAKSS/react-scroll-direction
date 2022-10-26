# Detect react scroll direction

![npm](https://img.shields.io/npm/v/@smakss/react-scroll-direction) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@smakss/react-scroll-direction) ![NPM](https://img.shields.io/npm/l/@smakss/react-scroll-direction) ![npm](https://img.shields.io/npm/dt/@smakss/react-scroll-direction) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@smakss/react-scroll-direction)

This is a custom hook for react which is useful to detect scroll direction in react applications with a efficient way and custom threshold.

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

- `thr` (`Number`): A number to indicate the threshold of firing scroll direction event, which is `0` by default and it is only accept a positive numeric value. If it gets higher value the steps will be longer.
- `up` (`string`): A string value for the output of custom hook if the scroll direction is upward. The default value is `up`.
- `down` (`string`): A string value for the output of custom hook if the scroll direction is downward. The default value is `down`.

## Examples of usage

if scroll goes upward:

```js
const [scrollDir] = useDetectScroll();

// scrollDir: "up"
```

if scroll goes downward:

```js
const [scrollDir] = useDetectScroll();

// scrollDir: "down"
```

## Demo

You can check the [working demo](https://runkit.com/smakss/) in runkit.

or

[![View @smakss/search](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-scroll-direction-tclwvp?fontsize=14&hidenavigation=1&theme=dark)
