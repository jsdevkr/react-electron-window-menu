import * as React from 'react';
import { IAXUIContextMenuItem } from './MenuItem';
import MenuItems from './MenuItems';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';

export interface IAXUIContextPopupMenu {
  visible: boolean;
  menuItems: IAXUIContextMenuItem[];
  onClickItem: IAXUIContextMenuOnClickItem;
  style?: { [key: string]: string | number };
}

class PopupMenu extends React.Component<IAXUIContextPopupMenu> {
  render() {
    const { visible = false, menuItems, onClickItem, style } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <div className="axui-contextmenu" data-align="top-left" style={style}>
        <MenuItems items={menuItems} onClickItem={onClickItem} />
      </div>
    );
  }
}

export default PopupMenu;
