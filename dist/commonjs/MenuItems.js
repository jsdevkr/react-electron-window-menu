"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MenuItem_1 = require("./MenuItem");
var MenuItems = function (_a) {
    var items = _a.items, onClickItem = _a.onClickItem;
    return (React.createElement(React.Fragment, null, items.map(function (item, i) { return (React.createElement(MenuItem_1.default, { key: i, item: item, onClickItem: onClickItem })); })));
};
exports.default = MenuItems;
