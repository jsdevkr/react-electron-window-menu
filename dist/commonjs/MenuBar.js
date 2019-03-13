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
var ContextMenu_1 = require("./ContextMenu");
var MenuBar = /** @class */ (function (_super) {
    __extends(MenuBar, _super);
    function MenuBar(props) {
        var _this = _super.call(this, props) || this;
        _this.onMousedownBody = function (e) {
            var el = e.target;
            if (_this.containerRef.current) {
                if (el && el instanceof Node && !_this.containerRef.current.contains(el)) {
                    _this.setState({ active: false, openedMenuIndex: -1 });
                    document.body.removeEventListener('mousedown', _this.onMousedownBody);
                    window.removeEventListener('keydown', _this.onKeyDownWindow);
                }
            }
        };
        _this.onKeyDownWindow = function (e) {
            if (e.which === 27) {
                // this.visible = false;
            }
        };
        _this.handleMenuBarActive = function () {
            _this.setState({
                active: true,
            });
            document.body.addEventListener('mousedown', _this.onMousedownBody);
            window.addEventListener('keydown', _this.onKeyDownWindow);
        };
        _this.handleMenuClick = function (e, menuIndex) {
            _this.handleSubmenuPopup(e, menuIndex);
        };
        _this.handleMenuOver = function (e, menuIndex) {
            var active = _this.state.active;
            if (!active) {
                return;
            }
            _this.handleSubmenuPopup(e, menuIndex);
        };
        _this.handleSubmenuPopup = function (e, menuIndex) {
            var submenu = _this.childMenu[menuIndex];
            if (!submenu) {
                return;
            }
            if (!e.currentTarget) {
                return;
            }
            if (!_this.containerRef.current) {
                return;
            }
            var _a = _this.state.openedMenuIndex, openedMenuIndex = _a === void 0 ? -1 : _a;
            var pageXOffset = window.pageXOffset, pageYOffset = window.pageYOffset;
            var _b = e.currentTarget.getBoundingClientRect(), left = _b.left, top = _b.top, height = _b.height;
            if (openedMenuIndex !== menuIndex) {
                _this.childMenu[openedMenuIndex] &&
                    _this.childMenu[openedMenuIndex].close();
            }
            submenu.popup({ x: left + pageXOffset, y: top + height + pageYOffset });
            _this.setState({
                openedMenuIndex: menuIndex,
            });
        };
        _this.childMenu = [];
        _this.containerRef = React.createRef();
        _this.state = {
            active: false,
            openedMenuIndex: -1,
        };
        return _this;
    }
    MenuBar.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, _b = _a.items, items = _b === void 0 ? [] : _b, _c = _a.submenu, _d = _c === void 0 ? {} : _c, _e = _d.style, _submenuStyle = _e === void 0 ? {} : _e, _f = _d.placement, placement = _f === void 0 ? 'bottom' : _f;
        var submenuStyle = __assign({}, _submenuStyle);
        if (placement === 'bottom') {
            submenuStyle.borderTopLeftRadius = 0;
            submenuStyle.borderTopRightRadius = 0;
            submenuStyle.marginTop = '0.5px';
        }
        items.forEach(function (menu, i) {
            var submenu = new ContextMenu_1.default({
                id: "menu-" + i,
                style: submenuStyle,
                placement: placement,
            });
            submenu.setMenu(menu.submenu || []);
            _this.childMenu.push(submenu);
        });
    };
    MenuBar.prototype.componentWillUnmount = function () { };
    MenuBar.prototype.render = function () {
        var _this = this;
        var _a = this.state, active = _a.active, openedMenuIndex = _a.openedMenuIndex;
        var _b = this.props, _c = _b.items, items = _c === void 0 ? [] : _c, style = _b.style;
        var menuBarStyle = __assign({}, style);
        return (React.createElement("div", { ref: this.containerRef, className: "rewm-menubar" + (active ? ' rewm-menubar-active' : ''), style: menuBarStyle }, items.map(function (menu, mi) {
            return (React.createElement("div", { className: "" + (openedMenuIndex === mi ? 'active' : ''), key: mi, "data-menubar-item": true, onMouseDown: function () {
                    _this.handleMenuBarActive();
                }, onClick: function (e) {
                    _this.handleMenuClick(e, mi);
                }, onMouseOver: function (e) {
                    _this.handleMenuOver(e, mi);
                } }, menu.label));
        })));
    };
    return MenuBar;
}(React.Component));
exports.default = MenuBar;
