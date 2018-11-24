export interface IAXUIContextMenuOptions {
}
export interface IAXUIContextMenu {
    render(): void;
}
declare class AXUIContextMenu implements IAXUIContextMenu {
    container: HTMLDivElement;
    constructor(options?: IAXUIContextMenuOptions);
    render(): void;
}
export default AXUIContextMenu;
