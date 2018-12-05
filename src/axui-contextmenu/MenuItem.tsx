import * as React from 'react';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';
import { IAXUIContextMenuOnHoverItem } from './PopupMenu';
import CheckboxIcon from './CheckboxIcon';
import SubmenuIcon from './SubmenuIcon';
import Submenu from './Submenu';

export interface IAXUIContextMenuItem {
  label?: string;
  sublabel?: string;
  type?: 'normal' | 'separator' | 'checkbox';
  icon?: string | React.ReactElement<any>;
  checked?: boolean;
  submenu?: IAXUIContextMenuItem[];
  click?: (
    menuItem: IAXUIContextMenuItem,
    browserWindow: Window,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
  opened?: boolean;
  enabled?: boolean;
  visible?: boolean;
  accelerator?: string;
}

interface IMenuItem {
  item: IAXUIContextMenuItem;
  onClickItem: IAXUIContextMenuOnClickItem;
  onHoverItem: IAXUIContextMenuOnHoverItem;
}

class MenuItem extends React.Component<IMenuItem> {
  itemRef: React.RefObject<HTMLDivElement>;

  constructor(props: IMenuItem) {
    super(props);
    this.itemRef = React.createRef();
  }

  render() {
    const { item, onClickItem, onHoverItem } = this.props;
    const {
      type = 'normal',
      label,
      icon,
      checked,
      submenu,
      click,
      enabled = true,
      visible = true,
    } = item;
    const itemProps = {};

    if (!visible) {
      return null;
    }

    switch (type) {
      case 'normal':
      case 'checkbox':
        itemProps['data-ctx-item'] = true;
        itemProps['data-enabled'] = enabled;

        if (item.opened) {
          itemProps['data-opened'] = true;
        }

        return (
          <div
            ref={this.itemRef}
            {...itemProps}
            onClick={e => {
              // has click and dont have submenu
              if (!item.submenu && enabled) {
                onClickItem(item, window, e);
                if (click) {
                  click(item, window, e);
                }
              }
            }}
            onMouseOver={e => {
              onHoverItem(item, e, true);
            }}
          >
            <div data-checkbox>{item.checked && <CheckboxIcon />}</div>

            <div data-label>
              {icon && <span data-label-icon>{icon}</span>}
              {item.label}
            </div>

            {item.submenu && (
              <>
                <SubmenuIcon />
                {item.opened && (
                  <Submenu
                    submenu={item.submenu}
                    onClickItem={onClickItem}
                    itemRef={this.itemRef}
                  />
                )}
              </>
            )}
          </div>
        );
      case 'separator':
        itemProps['data-ctx-separator'] = true;
        return <div {...itemProps} />;

      default:
        return null;
    }
  }
}

export default MenuItem;
