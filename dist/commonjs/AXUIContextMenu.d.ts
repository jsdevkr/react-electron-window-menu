import * as React from 'react';
import { IAXUIContextMenuItem } from './MenuItem';
export interface IAXUIContextMenuOptions {
    id?: string;
    style?: React.CSSProperties;
}
export interface IAXUIContextMenuPopupOption {
    x?: number;
    y?: number;
    callback?: () => void;
}
export interface IAXUIContextMenu {
    popup: (popupOption?: IAXUIContextMenuPopupOption) => void;
    setMenu: (menuItems: IAXUIContextMenuItem[]) => IAXUIContextMenu;
}
export declare type IAXUIContextMenuOnClickItem = (menuItem: IAXUIContextMenuItem, browserWindow: Window, event: React.MouseEvent<HTMLDivElement>) => void;
declare class AXUIContextMenu implements IAXUIContextMenu {
    container: HTMLDivElement;
    options: IAXUIContextMenuOptions;
    menuItems: IAXUIContextMenuItem[];
    _visible: boolean;
    constructor(options?: IAXUIContextMenuOptions);
    visible: boolean;
    setMenu(menuItems: IAXUIContextMenuItem[]): this;
    popup(popupOption: IAXUIContextMenuPopupOption): void;
    onClickItem: IAXUIContextMenuOnClickItem;
    onMousedownBody: (e: MouseEvent) => void;
    onKeyDownWindow: (e: KeyboardEvent) => void;
    render(): void;
}
export default AXUIContextMenu;
