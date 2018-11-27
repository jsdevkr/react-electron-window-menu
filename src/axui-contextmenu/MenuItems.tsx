import * as React from 'react';
import MenuItem, { IAXUIContextMenuItem } from './MenuItem';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';

const MenuItems: React.SFC<{
  items: IAXUIContextMenuItem[];
  onClickItem: IAXUIContextMenuOnClickItem;
}> = ({ items, onClickItem }) => {
  return (
    <>
      {items.map((item, i) => (
        <MenuItem key={i} item={item} onClickItem={onClickItem} />
      ))}
    </>
  );
};

export default MenuItems;
