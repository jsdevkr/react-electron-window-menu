import * as React from 'react';
import { IREWMenu } from './@types';
import { PopupMenu } from './components';
import * as ReactDOM from 'react-dom';

class ContextMenu implements IREWMenu.IContextMenu {
  container: HTMLDivElement | undefined;
  options: IREWMenu.IContextMenuOptions = {
    id: '',
  };
  menuItems: IREWMenu.IMenuItem[] = [];
  _visible: boolean = false;

  constructor(options: IREWMenu.IContextMenuOptions = {}) {
    this.options = options;
  }

  get visible() {
    return this._visible;
  }

  set visible(tf: boolean) {
    this._visible = tf;

    this.menuItems
      .filter(n => n)
      .forEach(n => {
        n.opened = false;
      });

    this.render();
  }

  setMenu(menuItems: IREWMenu.IMenuItem[]) {
    this.menuItems = [...menuItems];
    this.render();
    return this;
  }

  popup(popupOption?: IREWMenu.IPopupOption) {
    const { x: containerLeft = 0, y: containerTop = 0 } = popupOption ?? {};
    const { id = '' } = this.options;

    const existContainer = document.querySelectorAll(
      `[data-rewm-contextmenu-container="${id}"]`,
    )[0];

    if (existContainer && id !== '') {
      this.container = existContainer as HTMLDivElement;
      document.body.appendChild(this.container);
    } else {
      this.container = document.createElement('div');
      this.container.setAttribute('data-rewm-contextmenu-container', id);
      this.container.setAttribute('tabindex', '0');
      document.body.appendChild(this.container);
    }

    // set style of this.container
    this.container.style.position = 'absolute';
    this.container.style.left = containerLeft + 'px';
    this.container.style.top = containerTop + 'px';
    this.container.style.outline = '0';

    if (this.container) {
      this.visible = true;
    }
  }

  close() {
    this.visible = false;
  }

  onClickItem: IREWMenu.OnClickItem = (menuItem, w, e) => {
    const { type = 'normal', enabled = true } = menuItem;

    if (enabled) {
      if (!menuItem.submenu && menuItem.click) {
        menuItem.click(menuItem, w, e);
      }

      if (type === 'checkbox') {
        menuItem.checked = !menuItem.checked;
        this.render();
      } else {
        // 메뉴가 클릭되었다는 것을 인지하는 곳.
        this.visible = false;
      }
    }
  };

  // document.body에서 마우스 다운이 일어난 경우 contextMenu안쪽이 클릭된 것이지 바깥쪽에서 마우스 다운이 일어 난 건지 체크.
  onMousedownBody = (e: MouseEvent) => {
    var el = e.target;
    if (el && el instanceof Node && !this.container?.contains(el)) {
      this.visible = false;
    }
  };

  getCurrentHoveredIndex = (): number[] => {
    const currentHoveredIndex: number[] = [];
    const findOpenedItem = (items: IREWMenu.IMenuItem[]) => {
      const findex = items.findIndex(item => item.opened);
      if (findex > -1) {
        currentHoveredIndex.push(findex);
        if (items[findex].submenu) {
          findOpenedItem(items[findex].submenu!);
        }
      }
    };
    findOpenedItem(this.menuItems);
    return currentHoveredIndex;
  };

  moveHoveredIndex = (type: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    const currentHoveredIndexes = this.getCurrentHoveredIndex();
    let targetItems = this.menuItems;
    let targetItemsHoveredIndex = currentHoveredIndexes[0];

    currentHoveredIndexes.forEach((v, i) => {
      if (i < currentHoveredIndexes.length - 1 && targetItems[v].submenu) {
        targetItems = targetItems[v].submenu!;
        targetItemsHoveredIndex = currentHoveredIndexes[i + 1];
      }
    });
    if (type === 'UP' || type === 'DOWN') {
      targetItems.forEach(item => (item.opened = false));

      let ing = true;
      do {
        const nextMenuIndex =
          type === 'DOWN'
            ? targetItemsHoveredIndex === undefined
              ? 0
              : targetItemsHoveredIndex + 1
            : targetItemsHoveredIndex === undefined
            ? targetItems.length - 1
            : targetItemsHoveredIndex - 1;
        const nextMenu = targetItems[nextMenuIndex];
        if (!nextMenu) {
          targetItems[targetItemsHoveredIndex].opened = true;
          ing = false;
          break;
        }
        if (nextMenu.type === 'separator' || nextMenu.visible === false) {
          targetItemsHoveredIndex = nextMenuIndex;
          continue;
        }
        targetItems[nextMenuIndex].opened = true;
        ing = false;
      } while (ing);

      this.render();
    } else if (type === 'RIGHT') {
      if (targetItemsHoveredIndex === undefined) targetItemsHoveredIndex = 0;
      targetItems[targetItemsHoveredIndex].submenu?.forEach(
        item => (item.opened = false),
      );
      const submenu = targetItems[targetItemsHoveredIndex].submenu;
      if (submenu) {
        submenu[0].opened = true;
      }
      this.render();
    } else if (type === 'LEFT') {
      targetItems.forEach(item => (item.opened = false));
      this.render();
    }
  };

  handleClickItem = (e: KeyboardEvent) => {
    let menu: IREWMenu.IMenuItem | undefined;
    const findOpenedItem = (items: IREWMenu.IMenuItem[]) => {
      const findex = items.findIndex(item => item.opened);
      if (findex > -1) {
        menu = items[findex];
        if (items[findex].submenu) {
          findOpenedItem(items[findex].submenu!);
        }
      }
    };
    findOpenedItem(this.menuItems);

    if (menu) {
      this.onClickItem(menu, window);
    }
  };

  onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();

    switch (e.key) {
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        this.moveHoveredIndex('DOWN');
        break;
      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        this.moveHoveredIndex('UP');
        break;
      case 'Left': // IE/Edge specific value
      case 'ArrowLeft':
        this.moveHoveredIndex('LEFT');
        break;
      case 'Right': // IE/Edge specific value
      case 'ArrowRight':
        this.moveHoveredIndex('RIGHT');
        break;
      case 'Enter':
        this.handleClickItem(e);
        break;
      case 'Esc': // IE/Edge specific value
      case 'Escape':
        this.visible = false;
        break;
      default:
        return; // Quit when this doesn't handle the key event.
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
      this.container.focus();
      document.body.addEventListener('mousedown', this.onMousedownBody);
      this.container.addEventListener('keydown', this.onKeyDown);
    } else {
      document.body.removeEventListener('mousedown', this.onMousedownBody);
      this.container.removeEventListener('keydown', this.onKeyDown);
      this.container.blur();
      this.container.remove();
    }
  }
}

export default ContextMenu;
