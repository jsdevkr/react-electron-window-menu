"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MenuItems_1 = require("./MenuItems");
class PopupMenu extends React.Component {
    render() {
        const { visible = false, menuItems, onClickItem, style } = this.props;
        if (!visible) {
            return null;
        }
        return (React.createElement("div", { className: "axui-contextmenu", "data-align": "top-left", style: style },
            React.createElement(MenuItems_1.default, { items: menuItems, onClickItem: onClickItem })));
    }
}
exports.default = PopupMenu;
