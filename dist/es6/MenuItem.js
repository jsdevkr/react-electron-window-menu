"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MenuItem = ({ item, onClickItem }) => {
    const { type = 'normal', label, icon, checked, submenu, click } = item;
    switch (type) {
        case 'normal':
            return (React.createElement("div", { className: "axui-contextmenu-item", onClick: e => {
                    if (click) {
                        click(item, window, e);
                        onClickItem(item, window, e);
                    }
                } },
                icon ? React.createElement("span", { className: "icon-wrapper" }, icon) : null,
                item.label));
        case 'separator':
            return React.createElement("div", { className: "axui-contextmenu-separator" });
        case 'checkbox':
            return null;
        default:
            return null;
    }
};
exports.default = MenuItem;
