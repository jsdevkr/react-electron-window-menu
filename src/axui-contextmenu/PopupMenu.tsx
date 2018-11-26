import * as React from 'react';
import { IAXUIContextMenuItem } from './MenuItem';
import MenuItems from './MenuItems';

export interface IAXUIContextPopupMenu {
  menuItems: IAXUIContextMenuItem[];
}

class PopupMenu extends React.Component<IAXUIContextPopupMenu> {
  render() {
    const { menuItems } = this.props;
    return (
      <div className="axui-contextmenu" data-align="top-left">
        <MenuItems items={menuItems} />
      </div>
    );
  }
}

export default PopupMenu;
