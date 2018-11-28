import * as React from 'react';
import { IAXUIContextMenuItem } from './MenuItem';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';
export interface IAXUIContextPopupMenuProps {
    visible: boolean;
    menuItems: IAXUIContextMenuItem[];
    onClickItem: IAXUIContextMenuOnClickItem;
    parentOffset: {
        left: number;
        top: number;
        width?: number;
        height?: number;
        id?: string;
    };
    userStyle?: React.CSSProperties;
}
interface IAXUIContextPopupMenuState {
    visible: boolean;
    positioned: boolean;
    newLeft: number;
    newTop: number;
    menuItems: IAXUIContextMenuItem[];
}
export declare type IAXUIContextMenuOnHoverItem = (menuItem: IAXUIContextMenuItem, event: React.MouseEvent<HTMLDivElement>, hover: boolean) => void;
declare class PopupMenu extends React.Component<IAXUIContextPopupMenuProps, IAXUIContextPopupMenuState> {
    state: {
        visible: boolean;
        positioned: boolean;
        newLeft: number;
        newTop: number;
        menuItems: never[];
    };
    popupMenuRef: React.RefObject<HTMLDivElement>;
    static getDerivedStateFromProps(props: IAXUIContextPopupMenuProps, state: IAXUIContextPopupMenuState): IAXUIContextPopupMenuState | null;
    constructor(props: IAXUIContextPopupMenuProps);
    align: () => void;
    onHoverItem: IAXUIContextMenuOnHoverItem;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element | null;
}
export default PopupMenu;
