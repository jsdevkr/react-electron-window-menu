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
var PopupMenu_1 = require("./PopupMenu");
var SubmenuIcon = function () { return (React.createElement("svg", { viewBox: "0 0 1024 1024", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
    React.createElement("path", { d: "M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z" }))); };
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
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem(props) {
        var _this = _super.call(this, props) || this;
        _this.itemRef = React.createRef();
        return _this;
    }
    MenuItem.prototype.render = function () {
        var _a = this.props, item = _a.item, onClickItem = _a.onClickItem, onHoverItem = _a.onHoverItem;
        var _b = item.type, type = _b === void 0 ? 'normal' : _b, label = item.label, icon = item.icon, checked = item.checked, submenu = item.submenu, click = item.click;
        var itemProps = {};
        switch (type) {
            case 'normal':
                itemProps['data-ctx-item'] = true;
                if (item.opened) {
                    itemProps['data-opened'] = true;
                }
                return (React.createElement("div", __assign({ ref: this.itemRef }, itemProps, { onClick: function (e) {
                        // has click and dont have submenu
                        if (click && !item.submenu) {
                            click(item, window, e);
                            onClickItem(item, window, e);
                        }
                    }, onMouseOver: function (e) {
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
                return React.createElement("div", __assign({}, itemProps));
            case 'checkbox':
                return null;
            default:
                return null;
        }
    };
    return MenuItem;
}(React.Component));
exports.default = MenuItem;
