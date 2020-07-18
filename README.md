<p align="center">
  <img src="https://i.imgur.com/6z2UKST.png" width="150" />
  <h1 align="center" style="font-size: 48px;">Shortcut Commander</h1>
  <h5 align="center">Setup shortcuts for your app easily.</h5>
  <div style="display: flex; width: 100%; justify-content: center;">
    <a style="margin-right: 10px;" href="https://www.npmjs.com/package/button-commander">
    <img src="https://img.shields.io/npm/v/shortcut-commander.svg" />
  </a>
    <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" />
  </a>
  </div>

</p>

#

## Install

```bash
npm install --save button-commander
```

Using yarn:

```bash
yarn add button-commander
```

## Usage

```tsx
import * as React from "react";

import useCommander from "button-commander";

const Example = () => {
  useCommander(
    undefined,
    [
      {
        name: "Green Color",
        shortcut: { windows: ["ctrl", "z"], macOS: ["meta", "z"] },
        description: "Change background color to green",
        callback: () => (document.body.style.background = "#64C964"),
        stopBubblingUp: true,
      },
      {
        name: "Yellow Color",
        shortcut: { windows: ["ctrl", "x"], macOS: ["meta", "x"] },
        description: "Change background color to yellow",
        callback: () => (document.body.style.background = "#fdd231"),
      },
      {
        name: "Red Color",
        shortcut: { windows: ["ctrl", "c"], macOS: ["meta", "c"] },
        description: "Change background color to red",
        callback: () => (document.body.style.background = "#FF614D"),
      },
    ]
  );

  return <div>hello world!</button>;
};
```

## [Live Demo](https://shortcut-commander.vercel.app/)

## Found this project useful? ❤️

If you found this project useful, then please consider giving it a ⭐️ on Github and sharing it with your friends via social media.

## Issues and feedback 💭

If you have any suggestion for including a feature or if something doesn't work, feel free to open a Github [issue](https://github.com/fayeed/shortcut-commander/issues) for us to have a discussion on it.

## License

MIT © [fayeed](https://github.com/fayeed/shortcut-commander/blob/master/LICENSE)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
