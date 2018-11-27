"use strict";
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
            // console.log(menuItem);
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
        var style = this.options.style;
        ReactDOM.render(React.createElement(PopupMenu_1.default, { menuItems: this.menuItems, onClickItem: this.onClickItem, visible: this.visible, style: style }), this.container);
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
