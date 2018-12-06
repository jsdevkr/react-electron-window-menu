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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CheckboxIcon_1 = require("./CheckboxIcon");
var SubmenuIcon_1 = require("./SubmenuIcon");
var Submenu_1 = require("./Submenu");
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem(props) {
        var _this = _super.call(this, props) || this;
        _this.itemRef = React.createRef();
        return _this;
    }
    MenuItem.prototype.render = function () {
        var _a = this.props, item = _a.item, onClickItem = _a.onClickItem, onHoverItem = _a.onHoverItem;
        var _b = item.type, type = _b === void 0 ? 'normal' : _b, label = item.label, icon = item.icon, checked = item.checked, submenu = item.submenu, click = item.click, _c = item.enabled, enabled = _c === void 0 ? true : _c, _d = item.visible, visible = _d === void 0 ? true : _d;
        var itemProps = {};
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
                return (React.createElement("div", __assign({ ref: this.itemRef }, itemProps, { onClick: function (e) {
                        // has click and dont have submenu
                        if (!item.submenu && enabled) {
                            onClickItem(item, window, e);
                            if (click) {
                                click(item, window, e);
                            }
                        }
                    }, onMouseOver: function (e) {
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
                return React.createElement("div", __assign({}, itemProps));
            default:
                return null;
        }
    };
    return MenuItem;
}(React.Component));
exports.default = MenuItem;
