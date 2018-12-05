"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MenuItem_1 = require("./MenuItem");
class PopupMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            positioned: false,
            newLeft: 0,
            newTop: 0,
            menuItems: [],
        };
        this.align = () => {
            const { userStyle = {} } = this.props;
            const { left: pLeft, top: pTop, width: pWidth = 0, height: pHeight = 0, id, } = this.props.parentOffset;
            const { scrollWidth, scrollHeight } = document.body;
            let newLeft = Number(userStyle.left || 0);
            let newTop = Number(userStyle.top || 0);
            if (!this.state.positioned && this.popupMenuRef.current) {
                const popupMenuRect = this.popupMenuRef.current.getBoundingClientRect();
                const marginTop = Number(('' + window.getComputedStyle(this.popupMenuRef.current).marginTop).replace(/[a-zA-Z]/g, ''));
                if (pLeft + newLeft + popupMenuRect.width > scrollWidth) {
                    newLeft = newLeft - pWidth - popupMenuRect.width;
                }
                if (pTop + newTop + popupMenuRect.height > scrollHeight) {
                    newTop = newTop + pHeight - popupMenuRect.height - marginTop * 2;
                }
                this.setState({
                    positioned: true,
                    newLeft: Number(newLeft),
                    newTop: Number(newTop),
                });
            }
        };
        this.onHoverItem = (item, e, hover) => {
            this.setState(prevState => {
                prevState.menuItems.forEach(n => {
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
        this.popupMenuRef = React.createRef();
    }
    static getDerivedStateFromProps(props, state) {
        let nextState = state;
        let needChange = false;
        if (props.menuItems !== state.menuItems) {
            nextState.menuItems = props.menuItems;
            nextState.menuItems.forEach(n => {
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
    }
    componentDidMount() {
        this.align();
    }
    componentDidUpdate() {
        this.align();
    }
    render() {
        const { visible = false, menuItems, onClickItem, userStyle } = this.props;
        if (!visible) {
            return null;
        }
        const renderStyles = this.state.positioned
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
        const menuStyles = Object.assign({}, userStyle, renderStyles);
        return (React.createElement("div", { className: "axui-contextmenu", style: menuStyles, ref: this.popupMenuRef }, menuItems.map((item, i) => (React.createElement(MenuItem_1.default, { key: i, item: item, onClickItem: onClickItem, onHoverItem: this.onHoverItem })))));
    }
}
exports.default = PopupMenu;
