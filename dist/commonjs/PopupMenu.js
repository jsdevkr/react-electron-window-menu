"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MenuItems_1 = require("./MenuItems");
var PopupMenu = /** @class */ (function (_super) {
    __extends(PopupMenu, _super);
    function PopupMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopupMenu.prototype.render = function () {
        var _a = this.props, _b = _a.visible, visible = _b === void 0 ? false : _b, menuItems = _a.menuItems, onClickItem = _a.onClickItem, style = _a.style;
        if (!visible) {
            return null;
        }
        return (React.createElement("div", { className: "axui-contextmenu", "data-align": "top-left", style: style },
            React.createElement(MenuItems_1.default, { items: menuItems, onClickItem: onClickItem })));
    };
    return PopupMenu;
}(React.Component));
exports.default = PopupMenu;
