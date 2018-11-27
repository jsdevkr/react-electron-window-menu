import * as React from 'react';
import { IAXUIContextMenuItem } from './MenuItem';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';
export interface IAXUIContextPopupMenu {
    visible: boolean;
    menuItems: IAXUIContextMenuItem[];
    onClickItem: IAXUIContextMenuOnClickItem;
    style?: {
        [key: string]: string | number;
    };
}
declare class PopupMenu extends React.Component<IAXUIContextPopupMenu> {
    render(): JSX.Element | null;
}
export default PopupMenu;
