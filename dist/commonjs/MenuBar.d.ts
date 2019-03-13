import * as React from 'react';
import { IREWMenu } from './common/@types';
interface IState {
    active: boolean;
    openedMenuIndex: number;
}
declare class MenuBar extends React.Component<IREWMenu.IMenuBarProps, IState> {
    childMenu: IREWMenu.IContextMenu[];
    containerRef: React.RefObject<HTMLDivElement>;
    constructor(props: IREWMenu.IMenuBarProps);
    onMousedownBody: (e: MouseEvent) => void;
    onKeyDownWindow: (e: KeyboardEvent) => void;
    handleMenuBarActive: () => void;
    handleMenuClick: (e: React.MouseEvent<Element, MouseEvent>, menuIndex: number) => void;
    handleMenuOver: (e: React.MouseEvent<Element, MouseEvent>, menuIndex: number) => void;
    handleSubmenuPopup: (e: React.MouseEvent<Element, MouseEvent>, menuIndex: number) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default MenuBar;
