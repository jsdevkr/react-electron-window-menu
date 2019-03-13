import { IREWMenu } from './common/@types';
declare class ContextMenu implements IREWMenu.IContextMenu {
    container: HTMLDivElement;
    options: IREWMenu.IContextMenuOptions;
    menuItems: IREWMenu.IMenuItem[];
    _visible: boolean;
    constructor(options?: IREWMenu.IContextMenuOptions);
    visible: boolean;
    setMenu(menuItems: IREWMenu.IMenuItem[]): this;
    popup(popupOption: IREWMenu.IPopupOption): void;
    close(): void;
    onClickItem: IREWMenu.OnClickItem;
    onMousedownBody: (e: MouseEvent) => void;
    onKeyDownWindow: (e: KeyboardEvent) => void;
    render(): void;
}
export default ContextMenu;
