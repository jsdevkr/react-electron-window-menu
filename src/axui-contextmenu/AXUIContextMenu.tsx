import * as React from 'react';
import ReactDOM = require('react-dom');

export interface IAXUIContextMenuOptions {
  id?: string;
}
export interface IAXUIContextMenuItem {}
export interface IAXUIContextMenu {
  popup: () => void;
  setMenu: (menuItems: IAXUIContextMenuItem[]) => IAXUIContextMenu;
}

class AXUIContextMenu implements IAXUIContextMenu {
  container: HTMLDivElement;
  options: IAXUIContextMenuOptions = {
    id: '',
  };
  menuItems: IAXUIContextMenuItem[] = [];

  constructor(options: IAXUIContextMenuOptions = {}) {}

  setMenu(menuItems: IAXUIContextMenuItem[]) {
    this.menuItems = [...menuItems];
    return this;
  }

  popup() {
    const { id = '' } = this.options;

    const existContainer = document.querySelectorAll(
      `[data-axui-contextmenu-container="${id}"]`,
    )[0];

    if (existContainer && id !== '') {
      this.container = existContainer as any;
      document.body.appendChild(this.container);
    } else {
      this.container = document.createElement('div');
      this.container.setAttribute('data-axui-contextmenu-container', id);
      document.body.appendChild(this.container);
    }

    if (this.container) {
      ReactDOM.render(<>ContextMenu</>, this.container);
    }
  }
}

export default AXUIContextMenu;
