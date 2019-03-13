"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ContextMenu_1 = require("./ContextMenu");
class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.onMousedownBody = (e) => {
            var el = e.target;
            if (this.containerRef.current) {
                if (el && el instanceof Node && !this.containerRef.current.contains(el)) {
                    this.setState({ active: false, openedMenuIndex: -1 });
                    document.body.removeEventListener('mousedown', this.onMousedownBody);
                    window.removeEventListener('keydown', this.onKeyDownWindow);
                }
            }
        };
        this.onKeyDownWindow = (e) => {
            if (e.which === 27) {
                // this.visible = false;
            }
        };
        this.handleMenuBarActive = () => {
            this.setState({
                active: true,
            });
            document.body.addEventListener('mousedown', this.onMousedownBody);
            window.addEventListener('keydown', this.onKeyDownWindow);
        };
        this.handleMenuClick = (e, menuIndex) => {
            this.handleSubmenuPopup(e, menuIndex);
        };
        this.handleMenuOver = (e, menuIndex) => {
            const { active } = this.state;
            if (!active) {
                return;
            }
            this.handleSubmenuPopup(e, menuIndex);
        };
        this.handleSubmenuPopup = (e, menuIndex) => {
            const submenu = this.childMenu[menuIndex];
            if (!submenu) {
                return;
            }
            if (!e.currentTarget) {
                return;
            }
            if (!this.containerRef.current) {
                return;
            }
            const { openedMenuIndex = -1 } = this.state;
            const { pageXOffset, pageYOffset } = window;
            const { left, top, height } = e.currentTarget.getBoundingClientRect();
            if (openedMenuIndex !== menuIndex) {
                this.childMenu[openedMenuIndex] &&
                    this.childMenu[openedMenuIndex].close();
            }
            submenu.popup({ x: left + pageXOffset, y: top + height + pageYOffset });
            this.setState({
                openedMenuIndex: menuIndex,
            });
        };
        this.childMenu = [];
        this.containerRef = React.createRef();
        this.state = {
            active: false,
            openedMenuIndex: -1,
        };
    }
    componentDidMount() {
        const { items = [], submenu: { style: _submenuStyle = {}, placement = 'bottom' } = {}, } = this.props;
        const submenuStyle = Object.assign({}, _submenuStyle);
        if (placement === 'bottom') {
            submenuStyle.borderTopLeftRadius = 0;
            submenuStyle.borderTopRightRadius = 0;
            submenuStyle.marginTop = '0.5px';
        }
        items.forEach((menu, i) => {
            const submenu = new ContextMenu_1.default({
                id: `menu-${i}`,
                style: submenuStyle,
                placement,
            });
            submenu.setMenu(menu.submenu || []);
            this.childMenu.push(submenu);
        });
    }
    componentWillUnmount() { }
    render() {
        const { active, openedMenuIndex } = this.state;
        const { items = [], style } = this.props;
        const menuBarStyle = Object.assign({}, style);
        return (React.createElement("div", { ref: this.containerRef, className: `rewm-menubar${active ? ' rewm-menubar-active' : ''}`, style: menuBarStyle }, items.map((menu, mi) => {
            return (React.createElement("div", { className: `${openedMenuIndex === mi ? 'active' : ''}`, key: mi, "data-menubar-item": true, onMouseDown: () => {
                    this.handleMenuBarActive();
                }, onClick: e => {
                    this.handleMenuClick(e, mi);
                }, onMouseOver: e => {
                    this.handleMenuOver(e, mi);
                } }, menu.label));
        })));
    }
}
exports.default = MenuBar;
