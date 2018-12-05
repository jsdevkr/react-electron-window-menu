import * as React from 'react';
import { IAXUIContextMenuItem } from './MenuItem';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';
import PopupMenu from './PopupMenu';

const Submenu: React.SFC<{
  submenu: IAXUIContextMenuItem[];
  onClickItem: IAXUIContextMenuOnClickItem;
  itemRef: React.RefObject<HTMLDivElement>;
}> = ({ submenu, onClickItem, itemRef }) => {
  if (!itemRef.current) {
    return null;
  }

  const itemRect = itemRef.current.getBoundingClientRect();
  const submenuStyle: React.CSSProperties = {
    top: 0,
    left: itemRect.width,
  };

  return (
    <PopupMenu
      menuItems={submenu}
      onClickItem={onClickItem}
      visible={true}
      parentOffset={{
        width: Number(itemRect.width),
        height: Number(itemRect.height),
        left: itemRect.left,
        top: itemRect.top,
        id: 'tom',
      }}
      userStyle={submenuStyle}
    />
  );
};

export default Submenu;
