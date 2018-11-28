"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PopupMenu_1 = require("./PopupMenu");
const SubmenuIcon = () => (React.createElement("svg", { viewBox: "0 0 1024 1024", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
    React.createElement("path", { d: "M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z" })));
const Submenu = ({ submenu, onClickItem, itemRef }) => {
    if (!itemRef.current) {
        return null;
    }
    const itemRect = itemRef.current.getBoundingClientRect();
    const submenuStyle = {
        top: 0,
        left: itemRect.width,
    };
    return (React.createElement(PopupMenu_1.default, { menuItems: submenu, onClickItem: onClickItem, visible: true, parentOffset: {
            width: Number(itemRect.width),
            height: Number(itemRect.height),
            left: itemRect.left,
            top: itemRect.top,
            id: 'tom',
        }, userStyle: submenuStyle }));
};
class MenuItem extends React.Component {
    constructor(props) {
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
                return (React.createElement("div", Object.assign({ ref: this.itemRef }, itemProps, { onClick: e => {
                        // has click and dont have submenu
                        if (click && !item.submenu) {
                            click(item, window, e);
                            onClickItem(item, window, e);
                        }
                    }, onMouseOver: e => {
                        onHoverItem(item, e, true);
                    } }),
                    React.createElement("div", { "data-label": true },
                        icon ? React.createElement("span", { "data-label-icon": true }, icon) : null,
                        item.label),
                    item.submenu ? (React.createElement(React.Fragment, null,
                        React.createElement(SubmenuIcon, null),
                        item.opened ? (React.createElement(Submenu, { submenu: item.submenu, onClickItem: onClickItem, itemRef: this.itemRef })) : null)) : null));
            case 'separator':
                itemProps['data-ctx-separator'] = true;
                return React.createElement("div", Object.assign({}, itemProps));
            case 'checkbox':
                return null;
            default:
                return null;
        }
    }
}
exports.default = MenuItem;
