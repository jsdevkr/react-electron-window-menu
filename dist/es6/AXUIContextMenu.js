"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const PopupMenu_1 = require("./PopupMenu");
class AXUIContextMenu {
    constructor(options = {}) {
        this.options = {
            id: '',
        };
        this.menuItems = [];
        this._visible = false;
        this.onClickItem = (menuItem, w, e) => {
            const { type = 'normal', enabled = true, visible = true } = menuItem;
            if (enabled) {
                if (type === 'checkbox') {
                    menuItem.checked = !menuItem.checked;
                }
            }
            // 메뉴가 클릭되었다는 것은 인지하는 곳.
            this.visible = false;
        };
        // document.body에서 마우스 다운이 일어난 경우 contextMenu안쪽이 클릭된 것이지 바깥쪽에서 마우스 다운이 일어 난 건지 체크.
        this.onMousedownBody = (e) => {
            var el = e.target;
            if (el && el instanceof Node && !this.container.contains(el)) {
                this.visible = false;
            }
        };
        this.onKeyDownWindow = (e) => {
            if (e.which === 27) {
                this.visible = false;
            }
        };
        this.options = options;
    }
    get visible() {
        return this._visible;
    }
    set visible(tf) {
        this._visible = tf;
        this.menuItems.forEach(n => {
            n.opened = false;
        });
        this.render();
    }
    setMenu(menuItems) {
        this.menuItems = [...menuItems];
        this.render();
        return this;
    }
    popup(popupOption) {
        const { x: containerLeft = 0, y: containerTop = 0 } = popupOption;
        const { id = '' } = this.options;
        const existContainer = document.querySelectorAll(`[data-axui-contextmenu-container="${id}"]`)[0];
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
    }
    render() {
        if (!this.container) {
            return;
        }
        const { style = {} } = this.options;
        ReactDOM.render(React.createElement(PopupMenu_1.default, { menuItems: this.menuItems, onClickItem: this.onClickItem, visible: this.visible, parentOffset: {
                top: this.container.offsetTop,
                left: this.container.offsetLeft,
            }, userStyle: Object.assign({}, style, { left: 0, top: 0 }) }), this.container);
        if (this.visible) {
            document.body.addEventListener('mousedown', this.onMousedownBody);
            window.addEventListener('keydown', this.onKeyDownWindow);
        }
        else {
            document.body.removeEventListener('mousedown', this.onMousedownBody);
            window.removeEventListener('keydown', this.onKeyDownWindow);
        }
    }
}
exports.default = AXUIContextMenu;
