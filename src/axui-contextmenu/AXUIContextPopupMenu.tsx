import * as React from 'react';

export interface IAXUIContextMenuItem {
  label?: string;
  type?: 'normal' | 'separator' | 'ckeckbox';
  icon?: string;
  checked?: boolean;
  submenu?: IAXUIContextMenuItem[];
  click?: () => void;
}
export interface IAXUIContextPopupMenu {
  menuItems: IAXUIContextMenuItem[];
}

class PopupMenu extends React.Component<IAXUIContextPopupMenu> {
  render() {
    const { menuItems } = this.props;
    return (
      <div className="axui-contextmenu-container">
        {menuItems.map((mi, i) => {
          return (
            <div key={i} className="axui-contextmenu-item">
              {mi.label}
            </div>
          );
        })}
      </div>
    );
  }
}

export default PopupMenu;
