"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
class AXUIContextMenu {
    constructor(options) {
        this.container = document.createElement('div');
        this.container.setAttribute('data-axui-contextmenu-container', 'true');
        document.body.appendChild(this.container);
        this.render();
    }
    render() {
        ReactDOM.render(React.createElement(React.Fragment, null, "ContextMenu"), this.container);
    }
}
exports.default = AXUIContextMenu;
