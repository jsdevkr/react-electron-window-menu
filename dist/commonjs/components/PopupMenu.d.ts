import * as React from 'react';
import { IREWMenu } from '../common/@types';
declare class PopupMenu extends React.Component<IREWMenu.IPopupMenuProps, IREWMenu.IPopupMenuState> {
    state: {
        visible: boolean;
        positioned: boolean;
        newLeft: number;
        newTop: number;
        menuItems: never[];
    };
    popupMenuRef: React.RefObject<HTMLDivElement>;
    static getDerivedStateFromProps(props: IREWMenu.IPopupMenuProps, state: IREWMenu.IPopupMenuState): IREWMenu.IPopupMenuState | null;
    constructor(props: IREWMenu.IPopupMenuProps);
    align: () => void;
    onHoverItem: IREWMenu.OnHoverItem;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element | null;
}
export default PopupMenu;
