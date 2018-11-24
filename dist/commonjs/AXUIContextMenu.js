"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var AXUIContextMenu = /** @class */ (function () {
    function AXUIContextMenu(options) {
        this.container = document.createElement('div');
        this.container.setAttribute('data-axui-contextmenu-container', 'true');
        document.body.appendChild(this.container);
        this.render();
    }
    AXUIContextMenu.prototype.render = function () {
        ReactDOM.render(React.createElement(React.Fragment, null, "ContextMenu"), this.container);
    };
    return AXUIContextMenu;
}());
exports.default = AXUIContextMenu;
