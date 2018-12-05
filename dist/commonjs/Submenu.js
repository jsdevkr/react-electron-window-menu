"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PopupMenu_1 = require("./PopupMenu");
var Submenu = function (_a) {
    var submenu = _a.submenu, onClickItem = _a.onClickItem, itemRef = _a.itemRef;
    if (!itemRef.current) {
        return null;
    }
    var itemRect = itemRef.current.getBoundingClientRect();
    var submenuStyle = {
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
