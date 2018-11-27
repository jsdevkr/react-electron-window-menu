import * as React from 'react';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';

export interface IAXUIContextMenuItem {
  label?: string;
  type?: 'normal' | 'separator' | 'checkbox';
  icon?: string | React.ReactElement<any>;
  checked?: boolean;
  submenu?: IAXUIContextMenuItem[];
  click?: (
    menuItem: IAXUIContextMenuItem,
    browserWindow: Window,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
}

const MenuItem: React.SFC<{
  item: IAXUIContextMenuItem;
  onClickItem: IAXUIContextMenuOnClickItem;
}> = ({ item, onClickItem }) => {
  const { type = 'normal', label, icon, checked, submenu, click } = item;

  switch (type) {
    case 'normal':
      return (
        <div
          className="axui-contextmenu-item"
          onClick={e => {
            if (click) {
              click(item, window, e);
              onClickItem(item, window, e);
            }
          }}
        >
          {icon ? <span className="icon-wrapper">{icon}</span> : null}
          {item.label}
        </div>
      );
    case 'separator':
      return <div className="axui-contextmenu-separator" />;
    case 'checkbox':
      return null;
    default:
      return null;
  }
};

export default MenuItem;
