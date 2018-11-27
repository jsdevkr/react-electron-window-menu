"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MenuItem_1 = require("./MenuItem");
const MenuItems = ({ items, onClickItem }) => {
    return (React.createElement(React.Fragment, null, items.map((item, i) => (React.createElement(MenuItem_1.default, { key: i, item: item, onClickItem: onClickItem })))));
};
exports.default = MenuItems;
