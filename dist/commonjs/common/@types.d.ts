/// <reference types="react" />
export declare namespace IREWMenu {
    type OnHoverItem = (menuItem: IMenuItem, event: React.MouseEvent<HTMLDivElement>, hover: boolean) => void;
    type OnClickItem = (menuItem: IMenuItem, browserWindow: Window, event: React.MouseEvent<HTMLDivElement>) => void;
    interface IMenuItem {
        label?: string;
        sublabel?: string;
        type?: 'normal' | 'separator' | 'checkbox';
        icon?: string | React.ReactElement<any>;
        checked?: boolean;
        submenu?: IMenuItem[];
        click?: OnClickItem;
        opened?: boolean;
        enabled?: boolean;
        visible?: boolean;
        accelerator?: string;
    }
    interface IMenuItemProps {
        item: IMenuItem;
        onClickItem: OnClickItem;
        onHoverItem: OnHoverItem;
    }
    interface IContextMenuOptions {
        id?: string;
        style?: React.CSSProperties;
        placement?: 'top' | 'bottom';
    }
    interface IPopupOption {
        x?: number;
        y?: number;
        callback?: () => void;
    }
    interface IPopupMenuProps {
        visible: boolean;
        menuItems: IMenuItem[];
        onClickItem: OnClickItem;
        parentOffset: {
            left: number;
            top: number;
            width?: number;
            height?: number;
            id?: string;
        };
        userStyle?: React.CSSProperties;
    }
    interface IPopupMenuState {
        visible: boolean;
        positioned: boolean;
        newLeft: number;
        newTop: number;
        menuItems: IMenuItem[];
    }
    interface IContextMenu {
        popup: (popupOption?: IPopupOption) => void;
        setMenu: (menuItems: IMenuItem[]) => IContextMenu;
        close: () => void;
    }
    interface IMenuBarSubmenu {
        style?: React.CSSProperties;
        placement?: 'top' | 'bottom';
    }
    interface IMenuBarProps {
        items?: IMenuItem[];
        style?: React.CSSProperties;
        submenu?: IMenuBarSubmenu;
    }
}
