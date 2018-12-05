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
var MenuItem_1 = require("./MenuItem");
var PopupMenu = /** @class */ (function (_super) {
    __extends(PopupMenu, _super);
    function PopupMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            visible: true,
            positioned: false,
            newLeft: 0,
            newTop: 0,
            menuItems: [],
        };
        _this.align = function () {
            var _a = _this.props.userStyle, userStyle = _a === void 0 ? {} : _a;
            var _b = _this.props.parentOffset, pLeft = _b.left, pTop = _b.top, _c = _b.width, pWidth = _c === void 0 ? 0 : _c, _d = _b.height, pHeight = _d === void 0 ? 0 : _d, id = _b.id;
            var _e = document.body, scrollWidth = _e.scrollWidth, scrollHeight = _e.scrollHeight;
            var newLeft = Number(userStyle.left || 0);
            var newTop = Number(userStyle.top || 0);
            if (!_this.state.positioned && _this.popupMenuRef.current) {
                var popupMenuRect = _this.popupMenuRef.current.getBoundingClientRect();
                var marginTop = Number(('' + window.getComputedStyle(_this.popupMenuRef.current).marginTop).replace(/[a-zA-Z]/g, ''));
                if (pLeft + newLeft + popupMenuRect.width > scrollWidth) {
                    newLeft = newLeft - pWidth - popupMenuRect.width;
                }
                if (pTop + newTop + popupMenuRect.height > scrollHeight) {
                    newTop = newTop + pHeight - popupMenuRect.height - marginTop * 2;
                }
                _this.setState({
                    positioned: true,
                    newLeft: Number(newLeft),
                    newTop: Number(newTop),
                });
            }
        };
        _this.onHoverItem = function (item, e, hover) {
            _this.setState(function (prevState) {
                prevState.menuItems.forEach(function (n) {
                    if (n === item) {
                        n.opened = true;
                    }
                    else {
                        n.opened = false;
                    }
                });
                return {
                    menuItems: prevState.menuItems,
                };
            });
        };
        _this.popupMenuRef = React.createRef();
        return _this;
    }
    PopupMenu.getDerivedStateFromProps = function (props, state) {
        var nextState = state;
        var needChange = false;
        if (props.menuItems !== state.menuItems) {
            nextState.menuItems = props.menuItems;
            nextState.menuItems.forEach(function (n) {
                n.opened = false;
            });
        }
        if (props.visible !== state.visible) {
            nextState.visible = props.visible;
            if (!props.visible) {
                // visible false 가 되면 값 초기화.
                nextState.positioned = false;
            }
        }
        return needChange ? nextState : null;
    };
    PopupMenu.prototype.componentDidMount = function () {
        this.align();
    };
    PopupMenu.prototype.componentDidUpdate = function () {
        this.align();
    };
    PopupMenu.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.visible, visible = _b === void 0 ? false : _b, menuItems = _a.menuItems, onClickItem = _a.onClickItem, userStyle = _a.userStyle;
        if (!visible) {
            return null;
        }
        var renderStyles = this.state.positioned
            ? {
                left: this.state.newLeft,
                top: this.state.newTop,
            }
            : {
                opacity: 0,
                position: 'fixed',
                left: 0,
                top: 0,
            };
        var menuStyles = __assign({}, userStyle, renderStyles);
        return (React.createElement("div", { className: "axui-contextmenu", style: menuStyles, ref: this.popupMenuRef }, menuItems.map(function (item, i) { return (React.createElement(MenuItem_1.default, { key: i, item: item, onClickItem: onClickItem, onHoverItem: _this.onHoverItem })); })));
    };
    return PopupMenu;
}(React.Component));
exports.default = PopupMenu;
