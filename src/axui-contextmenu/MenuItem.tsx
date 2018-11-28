import * as React from 'react';
import { IAXUIContextMenuOnClickItem } from './AXUIContextMenu';
import PopupMenu, { IAXUIContextMenuOnHoverItem } from './PopupMenu';


export interface IAXUIContextMenuItem {
  label?: string;
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
}

const SubmenuIcon: React.SFC<{}> = () => <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" aria-hidden="true">
  <path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z" />
</svg>;

const Submenu: React.SFC<{
  item: IAXUIContextMenuItem;
  onClickItem: IAXUIContextMenuOnClickItem;
  itemRef: React.RefObject<HTMLDivElement>
}> = ({ item, onClickItem, itemRef }) => {
  const submenuStyle: any = {};

  if (itemRef.current) {
    submenuStyle.top = itemRef.current.offsetTop;
    submenuStyle.left = itemRef.current.getBoundingClientRect().width;
  }

  return <>
    <SubmenuIcon />
    {item.opened && item.submenu ? <PopupMenu menuItems={item.submenu}
      onClickItem={onClickItem}
      visible={true}
      userStyle={submenuStyle} /> : null}
  </>;
}

interface IMenuItem {
  item: IAXUIContextMenuItem;
  onClickItem: IAXUIContextMenuOnClickItem;
  onHoverItem: IAXUIContextMenuOnHoverItem;
}

class MenuItem extends React.Component<IMenuItem>{
  itemRef: React.RefObject<HTMLDivElement>;

  constructor(props: IMenuItem) {
    super(props);
    this.itemRef = React.createRef();
  }

  render() {
    const { item, onClickItem, onHoverItem } = this.props;
    const { type = 'normal', label, icon, checked, submenu, click } = item;

    const itemProps = {};

    switch (type) {
      case 'normal':
        itemProps['data-ctx-item'] = true;
        if (item.opened) {
          itemProps['data-opened'] = true;
        }

        return (
          <div
            ref={this.itemRef}
            {...itemProps}
            onClick={e => {
              if (click) {
                click(item, window, e);
                onClickItem(item, window, e);
              }
            }}
            onMouseOver={e => {
              onHoverItem(item, e);
            }}
          >
            <span data-label>
              {icon ? <span data-label-icon>{icon}</span> : null}
              {item.label}
            </span>

            {item.submenu ?
              <Submenu item={item} onClickItem={onClickItem} itemRef={this.itemRef} />
              : null}

          </div>
        );
      case 'separator':
        itemProps['data-ctx-separator'] = true;
        return <div {...itemProps} />;
      case 'checkbox':
        return null;
      default:
        return null;

    }
  }
};

export default MenuItem;
