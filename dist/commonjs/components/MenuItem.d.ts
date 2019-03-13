import * as React from 'react';
import { IREWMenu } from '../common/@types';
declare class MenuItem extends React.Component<IREWMenu.IMenuItemProps> {
    itemRef: React.RefObject<HTMLDivElement>;
    constructor(props: IREWMenu.IMenuItemProps);
    render(): JSX.Element | null;
}
export default MenuItem;
