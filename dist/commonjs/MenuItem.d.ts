import * as React from 'react';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';
import { IAXUIContextMenuOnHoverItem } from './PopupMenu';
export interface IAXUIContextMenuItem {
    label?: string;
    sublabel?: string;
    type?: 'normal' | 'separator' | 'checkbox';
    icon?: string | React.ReactElement<any>;
    checked?: boolean;
    submenu?: IAXUIContextMenuItem[];
    click?: (menuItem: IAXUIContextMenuItem, browserWindow: Window, event: React.MouseEvent<HTMLDivElement>) => void;
    opened?: boolean;
    enabled?: boolean;
    visible?: boolean;
    accelerator?: string;
}
interface IMenuItem {
    item: IAXUIContextMenuItem;
    onClickItem: IAXUIContextMenuOnClickItem;
    onHoverItem: IAXUIContextMenuOnHoverItem;
}
declare class MenuItem extends React.Component<IMenuItem> {
    itemRef: React.RefObject<HTMLDivElement>;
    constructor(props: IMenuItem);
    render(): JSX.Element | null;
}
export default MenuItem;
