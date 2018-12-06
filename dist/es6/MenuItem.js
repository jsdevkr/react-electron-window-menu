"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const CheckboxIcon_1 = require("./CheckboxIcon");
const SubmenuIcon_1 = require("./SubmenuIcon");
const Submenu_1 = require("./Submenu");
class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.itemRef = React.createRef();
    }
    render() {
        const { item, onClickItem, onHoverItem } = this.props;
        const { type = 'normal', label, icon, checked, submenu, click, enabled = true, visible = true, } = item;
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
                return (React.createElement("div", Object.assign({ ref: this.itemRef }, itemProps, { onClick: e => {
                        // has click and dont have submenu
                        if (!item.submenu && enabled) {
                            onClickItem(item, window, e);
                            if (click) {
                                click(item, window, e);
                            }
                        }
                    }, onMouseOver: e => {
                        onHoverItem(item, e, true);
                    } }),
                    React.createElement("div", { "data-checkbox": true }, item.checked && React.createElement(CheckboxIcon_1.default, null)),
                    React.createElement("div", { "data-label": true },
                        icon && React.createElement("span", { "data-label-icon": true }, icon),
                        item.label),
                    item.submenu ? (React.createElement(React.Fragment, null,
                        React.createElement(SubmenuIcon_1.default, null),
                        item.opened && (React.createElement(Submenu_1.default, { submenu: item.submenu, onClickItem: onClickItem, itemRef: this.itemRef })))) : (React.createElement("div", { "data-accelerator": true }, item.accelerator))));
            case 'separator':
                itemProps['data-ctx-separator'] = true;
                return React.createElement("div", Object.assign({}, itemProps));
            default:
                return null;
        }
    }
}
exports.default = MenuItem;
