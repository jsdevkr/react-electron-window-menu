import * as React from 'react';
import MenuItem, { IAXUIContextMenuItem } from './MenuItem';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';

interface IMenuItemsProps {
  visible: boolean;
  items: IAXUIContextMenuItem[];
  onClickItem: IAXUIContextMenuOnClickItem;
}


interface IMenuItemsState {
  visible: boolean;
  items: IAXUIContextMenuItem[];
}

export type IAXUIContextMenuOnHoverItem = (
  menuItem: IAXUIContextMenuItem,
  event: React.MouseEvent<HTMLDivElement>,
) => void;


class MenuItems extends React.Component<IMenuItemsProps, IMenuItemsState> {
  state = {
    visible: true,
    items: []
  }

  static getDerivedStateFromProps(props: IMenuItemsProps, state: IMenuItemsState) {
    let nextState = state;
    let needChange = false;

    if (props.items !== state.items) {
      nextState.items = props.items;
    }
    if (props.visible !== state.visible) {
      nextState.visible = props.visible;
    }

    return needChange ? nextState : null;
  }

  onHoverItem: IAXUIContextMenuOnHoverItem = (item, e) => {
    this.setState(prevState => {
      prevState.items.forEach(n => {
        if (n === item) {
          n.opened = true;
        } else {
          n.opened = false;
        }
      });

      return {
        items: prevState.items
      }
    });
  }

  render() {
    const { onClickItem } = this.props;
    const { items } = this.state;
    return (
      <>
        {items.map((item, i) => (
          <MenuItem key={i} item={item} onClickItem={onClickItem} onHoverItem={this.onHoverItem} />
        ))}
      </>
    );
  }
}

export default MenuItems;
