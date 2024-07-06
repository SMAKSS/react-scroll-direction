# React Scroll Direction Hook

![npm](https://img.shields.io/npm/v/@smakss/react-scroll-direction) ![NPM](https://img.shields.io/npm/l/@smakss/react-scroll-direction) ![npm](https://img.shields.io/npm/dt/@smakss/react-scroll-direction) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@smakss/react-scroll-direction)

`@smakss/react-scroll-direction` is a versatile, lightweight React hook that not only detects the scroll direction but also provides the scroll position in your application with ease. This enhanced functionality includes detecting distances from the top, bottom, left, and right edges of the viewport, making it an ideal solution for advanced scroll-based interactions in your React applications.

Originally inspired by a [popular StackOverflow response](https://stackoverflow.com/a/62497293/11908502), this package has evolved into a comprehensive tool for managing scroll detection in React applications.

## Demo

Experience the extended capabilities of `@smakss/react-scroll-direction` on CodeSandbox:

[![View @smakss/search](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-scroll-direction-tclwvp?fontsize=14&hidenavigation=1&theme=dark)

## Installation

Install `@smakss/react-scroll-direction` via npm or yarn:

```bash
npm install @smakss/react-scroll-direction
# or
yarn add @smakss/react-scroll-direction
```

Then, import it into your project:

ES Module:

```js
import useDetectScroll from '@smakss/react-scroll-direction';
```

For TypeScript projects, import the hook and its types:

```ts
import useDetectScroll, {
  Axis,
  Direction
} from '@smakss/react-scroll-direction';
```

## Usage

The `useDetectScroll` hook takes an options object with the following properties:

- `target`: The target scrollable element from which to detect scroll direction and position (default: `window`, must be an `HTMLDivElement`).
- `thr`: Threshold for scroll direction change detection (default: `0`, accepts only positive values).
- `axis`: Defines the scroll axis (`"y"` or `"x"`, default: `"y"`).
- `scrollUp`: Value returned when scrolling up (y-axis) or left (x-axis) (default: `"up"` for y-axis, `"left"` for x-axis).
- `scrollDown`: Value returned when scrolling down (y-axis) or right (x-axis) (default: `"down"` for y-axis, `"right"` for x-axis).
- `still`: Value returned when there's no scrolling activity (default: `"still"`).

The hook returns an object with two properties:

- `scrollDir`: Indicates the scroll direction (`"up"`, `"down"`, `"left"`, `"right"`, or `"still"`).
- `scrollPosition`: An object containing distances from the top, bottom, left, and right edges of the viewport.

## Examples

To detect both scroll direction and position:

```js
const { scrollDir, scrollPosition } = useDetectScroll();

// scrollDir: "up", "down", "left", "right", or "still"
// scrollPosition: { top, bottom, left, right }
```

To customize for horizontal scroll:

```js
const { scrollDir, scrollPosition } = useDetectScroll({ axis: Axis.X });

// scrollDir: "left", "right", or "still"
// scrollPosition: { top, bottom, left, right }
```

To use a custom scrollable element as a target rather than the default window:

```js
const customElementRef = useRef<HTMLDivElement>(null);
const [customElement, setCustomElement] = useState<HTMLDivElement>();
    useEffect(() => {
        if(customElementRef.current) {
            setHomepageElement(customElementRef.current);
        }
    }, [customElementRef])
    const scrollDir = useDetectScroll({target: customElement});
    console.log(scrollDir);
```

## Contributing

Interested in making contributions to this project? Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines and details.

## Code of Conduct

We value and prioritize the well-being of all our contributors and users. To ensure that this project remains a welcoming space for everyone, please refer to our [Code of Conduct](./CODE_OF_CONDUCT.md).
