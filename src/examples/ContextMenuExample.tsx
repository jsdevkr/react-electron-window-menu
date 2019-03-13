import * as React from 'react';

import { ContextMenu, IREWMenu } from 'react-electron-window-menu';
import 'react-electron-window-menu/style.scss';
import { styled } from 'styledComponents';
import { Icon } from 'antd';

const Container = styled.div`
  height: 300px;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IProps {}
interface IState {}

class ContextMenuExample extends React.Component<IProps, IState> {
  menu: IREWMenu.IContextMenu;
  state = {};

  constructor(props: IProps) {
    super(props);

    this.menu = new ContextMenu({
      id: 'basic',
      style: { fontSize: '14px', minWidth: '200px' },
    });
  }

  onClickMenu: IREWMenu.OnClickItem = (menuItem, w, e) => {
    console.log(menuItem);
  };

  handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    this.menu.popup({ x: e.pageX, y: e.pageY });
  };

  render() {
    return (
      <Container onContextMenu={this.handleContextMenu}>
        Right mouse click here
      </Container>
    );
  }

  componentDidMount() {
    this.menu.setMenu([
      {
        label: 'Back (enabled: false)',
        icon: <Icon type="arrow-left" />,
        click: this.onClickMenu,
        enabled: false,
      },
      {
        label: 'Forward',
        icon: <Icon type="arrow-right" />,
        click: this.onClickMenu,
        accelerator: 'Cmd+F',
      },
      {
        label: 'Reload',
        icon: <Icon type="caret-right" />,
        click: this.onClickMenu,
      },
      { type: 'separator' },
      { label: 'Save as', click: this.onClickMenu, visible: false },
      {
        label: 'Print (enabled: false)',
        click: this.onClickMenu,
        enabled: false,
      },
      {
        type: 'checkbox',
        label: 'Action option 1',
        click: (menuItem, w, e) => {
          console.log(menuItem);
        },
      },
      {
        type: 'checkbox',
        label: 'Action option 2 (enabled: false)',
        checked: true,
        enabled: false,
        click: (menuItem, w, e) => {
          console.log(menuItem);
        },
      },
      {
        label: 'send to...',
        submenu: [
          {
            label: 'Github',
            icon: <Icon type="github" />,
            click: this.onClickMenu,
          },
          {
            label: 'Gitlab',
            icon: <Icon type="gitlab" />,
            click: this.onClickMenu,
          },
          {
            label: 'Twitter',
            icon: <Icon type="twitter" />,
            click: this.onClickMenu,
          },
          {
            label: 'Facebook',
            icon: <Icon type="facebook" />,
            click: this.onClickMenu,
          },
          {
            label: 'Google+',
            icon: <Icon type="google-plus" />,
            click: this.onClickMenu,
            visible: false,
          },
          {
            label: 'Slack (enabled: false)',
            icon: <Icon type="slack-square" />,
            click: this.onClickMenu,
            enabled: false,
          },
          {
            label: 'Email',
            icon: <Icon type="mail" />,
            click: this.onClickMenu,
          },
        ],
      },
      { type: 'separator' },
      { label: 'View Source', click: this.onClickMenu },
      { label: 'Save', click: this.onClickMenu },
    ]);
  }
}

export default ContextMenuExample;
