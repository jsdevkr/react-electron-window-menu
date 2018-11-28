import * as React from 'react';

import ContextMenu, {
  IAXUIContextMenu,
  IAXUIContextMenuItem,
} from 'axui-contextmenu';
import 'axui-contextmenu/style.scss';
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

class BasicExample extends React.Component<IProps, IState> {
  menu: IAXUIContextMenu;
  state = {};

  constructor(props: IProps) {
    super(props);

    this.menu = new ContextMenu({
      id: 'basic',
      style: { fontSize: '14px', minWidth: '200px' },
    });
  }

  onClickMenu: IAXUIContextMenuItem['click'] = (menuItem, w, e) => {
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
        label: 'Back',
        icon: <Icon type="arrow-left" />,
        click: this.onClickMenu,
      },
      {
        label: 'Forward',
        icon: <Icon type="arrow-right" />,
        click: this.onClickMenu,
      },
      {
        label: 'Reload',
        icon: <Icon type="caret-right" />,
        click: this.onClickMenu,
      },
      { type: 'separator' },
      { label: 'Save as', click: this.onClickMenu },
      { label: 'Print', click: this.onClickMenu },
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
          },
          {
            label: 'Slack',
            icon: <Icon type="slack-square" />,
            click: this.onClickMenu,
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

export default BasicExample;
