import * as React from 'react';

export interface IAXUIContextMenuItem {
  label?: string;
  type?: 'normal' | 'separator' | 'checkbox';
  icon?: string;
  checked?: boolean;
  submenu?: IAXUIContextMenuItem[];
  click?: () => void;
}

const MenuItem: React.SFC<{ item: IAXUIContextMenuItem }> = ({ item }) => {
  const { type = 'normal', label, icon, checked, submenu } = item;

  switch (type) {
    case 'normal':
      return <div className="axui-contextmenu-item">{item.label}</div>;
    case 'separator':
      return <div className="axui-contextmenu-separator" />;
    case 'checkbox':
      return null;
    default:
      return null;
  }
};

export default MenuItem;
