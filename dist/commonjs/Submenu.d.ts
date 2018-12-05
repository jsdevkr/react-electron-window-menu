import * as React from 'react';
import { IAXUIContextMenuItem } from './MenuItem';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';
declare const Submenu: React.SFC<{
    submenu: IAXUIContextMenuItem[];
    onClickItem: IAXUIContextMenuOnClickItem;
    itemRef: React.RefObject<HTMLDivElement>;
}>;
export default Submenu;
