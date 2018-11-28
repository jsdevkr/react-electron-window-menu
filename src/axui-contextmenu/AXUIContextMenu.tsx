import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PopupMenu from './PopupMenu';
import { IAXUIContextMenuItem } from './MenuItem';

export interface IAXUIContextMenuOptions {
  id?: string;
  style?: React.CSSProperties;
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

export type IAXUIContextMenuOnClickItem = (
  menuItem: IAXUIContextMenuItem,
  browserWindow: Window,
  event: React.MouseEvent<HTMLDivElement>,
) => void;

class AXUIContextMenu implements IAXUIContextMenu {
  container: HTMLDivElement;
  options: IAXUIContextMenuOptions = {
    id: '',
  };
  menuItems: IAXUIContextMenuItem[] = [];
  _visible: boolean = false;

  constructor(options: IAXUIContextMenuOptions = {}) {
    this.options = options;
  }

  get visible() {
    return this._visible;
  }

  set visible(tf: boolean) {
    this._visible = tf;
    this.menuItems.forEach(n => {
      n.opened = false;
    });
    this.render();
  }

  setMenu(menuItems: IAXUIContextMenuItem[]) {
    this.menuItems = [...menuItems];
    this.render();
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
      this.visible = true;
    }
  }

  onClickItem: IAXUIContextMenuOnClickItem = (menuItem, w, e) => {
    // console.log(menuItem);
    // 메뉴가 클릭되었다는 것은 인지하는 곳.
    this.visible = false;
  };

  // document.body에서 마우스 다운이 일어난 경우 contextMenu안쪽이 클릭된 것이지 바깥쪽에서 마우스 다운이 일어 난 건지 체크.
  onMousedownBody = (e: MouseEvent) => {
    var el = e.target;
    if (el && el instanceof Node && !this.container.contains(el)) {
      this.visible = false;
    }
  };

  onKeyDownWindow = (e: KeyboardEvent) => {
    if (e.which === 27) {
      this.visible = false;
    }
  };

  render() {
    if (!this.container) {
      return;
    }
    const { style = {} } = this.options;

    ReactDOM.render(
      <PopupMenu
        menuItems={this.menuItems}
        onClickItem={this.onClickItem}
        visible={this.visible}
        parentOffset={{
          top: this.container.offsetTop,
          left: this.container.offsetLeft,
        }}
        userStyle={{ ...style, ...{ left: 0, top: 0 } }}
      />,
      this.container,
    );

    if (this.visible) {
      document.body.addEventListener('mousedown', this.onMousedownBody);
      window.addEventListener('keydown', this.onKeyDownWindow);
    } else {
      document.body.removeEventListener('mousedown', this.onMousedownBody);
      window.removeEventListener('keydown', this.onKeyDownWindow);
    }
  }
}

export default AXUIContextMenu;
