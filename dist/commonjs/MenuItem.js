"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MenuItem = function (_a) {
    var item = _a.item, onClickItem = _a.onClickItem;
    var _b = item.type, type = _b === void 0 ? 'normal' : _b, label = item.label, icon = item.icon, checked = item.checked, submenu = item.submenu, click = item.click;
    switch (type) {
        case 'normal':
            return (React.createElement("div", { className: "axui-contextmenu-item", onClick: function (e) {
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
