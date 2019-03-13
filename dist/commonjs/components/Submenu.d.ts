import * as React from 'react';
import { IREWMenu } from '../common/@types';
declare const Submenu: React.SFC<{
    submenu: IREWMenu.IMenuItem[];
    onClickItem: IREWMenu.OnClickItem;
    itemRef: React.RefObject<HTMLDivElement>;
}>;
export default Submenu;
