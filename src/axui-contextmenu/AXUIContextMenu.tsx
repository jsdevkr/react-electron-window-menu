import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PopupMenu, { IAXUIContextMenuItem } from './AXUIContextPopupMenu';

export interface IAXUIContextMenuOptions {
  id?: string;
}

export interface IAXUIContextMenuPopupOption {
  x?: number;
  y?: number;
  callback?: () => void;
}

export interface IAXUIContextMenu {
  popup: (popupOption?: IAXUIContextMenuPopupOption) => void;
  setMenu: (menuItems: IAXUIContextMenuItem[]) => IAXUIContextMenu;
}

class AXUIContextMenu implements IAXUIContextMenu {
  container: HTMLDivElement;
  options: IAXUIContextMenuOptions = {
    id: '',
  };
  menuItems: IAXUIContextMenuItem[] = [];

  constructor(options: IAXUIContextMenuOptions = {}) {
    this.options = options;
  }

  setMenu(menuItems: IAXUIContextMenuItem[]) {
    this.menuItems = [...menuItems];
    return this;
  }

  popup(popupOption: IAXUIContextMenuPopupOption) {
    const { x: containerLeft = 0, y: containerTop = 0 } = popupOption;
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

    // set style of this.container
    this.container.style.position = 'absolute';
    this.container.style.left = containerLeft + 'px';
    this.container.style.top = containerTop + 'px';

    if (this.container) {
      ReactDOM.render(<PopupMenu menuItems={this.menuItems} />, this.container);
    }
  }
}

export default AXUIContextMenu;
