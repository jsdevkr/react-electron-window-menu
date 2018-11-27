import * as React from 'react';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';
export interface IAXUIContextMenuItem {
    label?: string;
    type?: 'normal' | 'separator' | 'checkbox';
    icon?: string | React.ReactElement<any>;
    checked?: boolean;
    submenu?: IAXUIContextMenuItem[];
    click?: (menuItem: IAXUIContextMenuItem, browserWindow: Window, event: React.MouseEvent<HTMLDivElement>) => void;
}
declare const MenuItem: React.SFC<{
    item: IAXUIContextMenuItem;
    onClickItem: IAXUIContextMenuOnClickItem;
}>;
export default MenuItem;
