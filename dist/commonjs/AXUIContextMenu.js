"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var PopupMenu_1 = require("./PopupMenu");
var AXUIContextMenu = /** @class */ (function () {
    function AXUIContextMenu(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.options = {
            id: '',
        };
        this.menuItems = [];
        this._visible = false;
        this.onClickItem = function (menuItem, w, e) {
            var _a = menuItem.type, type = _a === void 0 ? 'normal' : _a, _b = menuItem.enabled, enabled = _b === void 0 ? true : _b, _c = menuItem.visible, visible = _c === void 0 ? true : _c;
            if (enabled) {
                if (type === 'checkbox') {
                    menuItem.checked = !menuItem.checked;
                }
            }
            // 메뉴가 클릭되었다는 것은 인지하는 곳.
            _this.visible = false;
        };
        // document.body에서 마우스 다운이 일어난 경우 contextMenu안쪽이 클릭된 것이지 바깥쪽에서 마우스 다운이 일어 난 건지 체크.
        this.onMousedownBody = function (e) {
            var el = e.target;
            if (el && el instanceof Node && !_this.container.contains(el)) {
                _this.visible = false;
            }
        };
        this.onKeyDownWindow = function (e) {
            if (e.which === 27) {
                _this.visible = false;
            }
        };
        this.options = options;
    }
    Object.defineProperty(AXUIContextMenu.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (tf) {
            this._visible = tf;
            this.menuItems.forEach(function (n) {
                n.opened = false;
            });
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    AXUIContextMenu.prototype.setMenu = function (menuItems) {
        this.menuItems = __spread(menuItems);
        this.render();
        return this;
    };
    AXUIContextMenu.prototype.popup = function (popupOption) {
        var _a = popupOption.x, containerLeft = _a === void 0 ? 0 : _a, _b = popupOption.y, containerTop = _b === void 0 ? 0 : _b;
        var _c = this.options.id, id = _c === void 0 ? '' : _c;
        var existContainer = document.querySelectorAll("[data-axui-contextmenu-container=\"" + id + "\"]")[0];
        if (existContainer && id !== '') {
            this.container = existContainer;
            document.body.appendChild(this.container);
        }
        else {
            this.container = document.createElement('div');
            this.container.setAttribute('data-axui-contextmenu-container', id);
            document.body.appendChild(this.container);
        }
        // set style of this.container
        this.container.style.position = 'absolute';
        this.container.style.left = containerLeft + 'px';
        this.container.style.top = containerTop + 'px';
        if (this.container) {
            this.visible = true;
        }
    };
    AXUIContextMenu.prototype.render = function () {
        if (!this.container) {
            return;
        }
        var _a = this.options.style, style = _a === void 0 ? {} : _a;
        ReactDOM.render(React.createElement(PopupMenu_1.default, { menuItems: this.menuItems, onClickItem: this.onClickItem, visible: this.visible, parentOffset: {
                top: this.container.offsetTop,
                left: this.container.offsetLeft,
            }, userStyle: __assign({}, style, { left: 0, top: 0 }) }), this.container);
        if (this.visible) {
            document.body.addEventListener('mousedown', this.onMousedownBody);
            window.addEventListener('keydown', this.onKeyDownWindow);
        }
        else {
            document.body.removeEventListener('mousedown', this.onMousedownBody);
            window.removeEventListener('keydown', this.onKeyDownWindow);
        }
    };
    return AXUIContextMenu;
}());
exports.default = AXUIContextMenu;
