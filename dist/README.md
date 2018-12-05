[![npm version](https://badge.fury.io/js/axui-contextmenu.svg)](https://badge.fury.io/js/axui-contextmenu)
[![](https://img.shields.io/npm/dm/axui-contextmenu.svg)](https://www.npmjs.com/package/axui-contextmenu)

# axui-contextmenu

## Install

```
$ npm i axui-contextmenu
```

```js
import * as React from 'react';
import ContextMenu from 'axui-contextmenu';
import 'axui-contextmenu/style.css';

class BasicExample extends React.Component {
  state = {};

  constructor(props) {
    super(props);

    this.menu = new ContextMenu({
      id: 'basic',
      style: { fontSize: '14px', minWidth: '200px' },
    });
  }

  handleContextMenu = (e) => {
    e.preventDefault();

    this.menu.setMenu([
      {
        label: 'Back',
        click: (menuItem, w, e) => {},
      },
      {
        label: 'Forward',
        icon: <Icon type="arrow-right" />,
        click: (menuItem, w, e) => {},
      },
      {
        label: 'send to...',
        submenu: [
          {
            label: 'send Github',
            click: (menuItem, w, e) => {},
          }
        ]
      }
    ]);
    this.menu.popup({ x: e.pageX, y: e.pageY });
  };

  render() {
    return (
      <div onContextMenu={this.handleContextMenu}>
        Right mouse click here
      </div>
    );
  }

```

## View Demo : [https://codesandbox.io/s/9j6m3ojo3o](https://codesandbox.io/s/9j6m3ojo3o)
