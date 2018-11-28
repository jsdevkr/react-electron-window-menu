import * as React from 'react';
import MenuItem, { IAXUIContextMenuItem } from './MenuItem';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';

export interface IAXUIContextPopupMenuProps {
  visible: boolean;
  menuItems: IAXUIContextMenuItem[];
  onClickItem: IAXUIContextMenuOnClickItem;
  userStyle?: { [key: string]: string | number };
}

interface IAXUIContextPopupMenuState {
  visible: boolean;
  menuItems: IAXUIContextMenuItem[];
}

export type IAXUIContextMenuOnHoverItem = (
  menuItem: IAXUIContextMenuItem,
  event: React.MouseEvent<HTMLDivElement>,
) => void;

class PopupMenu extends React.Component<IAXUIContextPopupMenuProps, IAXUIContextPopupMenuState> {

  state = {
    visible: true,
    menuItems: []
  }

  static getDerivedStateFromProps(props: IAXUIContextPopupMenuProps, state: IAXUIContextPopupMenuState) {
    let nextState = state;
    let needChange = false;

    if (props.menuItems !== state.menuItems) {
      nextState.menuItems = props.menuItems;
      nextState.menuItems.forEach(n => {
        n.opened = false;
      });
    }
    if (props.visible !== state.visible) {
      nextState.visible = props.visible;
    }

    return needChange ? nextState : null;
  }

  onHoverItem: IAXUIContextMenuOnHoverItem = (item, e) => {
    this.setState(prevState => {
      prevState.menuItems.forEach(n => {
        if (n === item) {
          n.opened = true;
        } else {
          n.opened = false;
        }
      });

      return {
        menuItems: prevState.menuItems
      }
    });
  }

  render() {
    const { visible = false, menuItems, onClickItem, userStyle } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <div className="axui-contextmenu" data-align="top-left" style={userStyle}>
        {menuItems.map((item, i) => (
          <MenuItem key={i} item={item} onClickItem={onClickItem} onHoverItem={this.onHoverItem} />
        ))}
      </div>
    );
  }
}

export default PopupMenu;
