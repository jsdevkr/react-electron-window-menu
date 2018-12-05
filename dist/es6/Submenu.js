"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PopupMenu_1 = require("./PopupMenu");
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
exports.default = Submenu;
