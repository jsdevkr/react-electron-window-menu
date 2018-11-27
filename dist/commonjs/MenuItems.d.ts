import * as React from 'react';
import { IAXUIContextMenuItem } from './MenuItem';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';
declare const MenuItems: React.SFC<{
    items: IAXUIContextMenuItem[];
    onClickItem: IAXUIContextMenuOnClickItem;
}>;
export default MenuItems;
