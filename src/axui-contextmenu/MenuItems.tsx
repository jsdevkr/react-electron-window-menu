import * as React from 'react';
import MenuItem, { IAXUIContextMenuItem } from './MenuItem';

const MenuItems: React.SFC<{ items: IAXUIContextMenuItem[] }> = ({ items }) => {
  return (
    <>
      {items.map((item, i) => (
        <MenuItem key={i} item={item} />
      ))}
    </>
  );
};

export default MenuItems;
