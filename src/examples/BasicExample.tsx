import * as React from 'react';

import ContextMenu, {
  IAXUIContextMenu,
  IAXUIContextMenuItem,
} from 'axui-contextmenu';
import 'axui-contextmenu/style.css';
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
        label: '뒤로',
        icon: <Icon type="arrow-left" />,
        click: this.onClickMenu,
      },
      {
        label: '앞으로',
        icon: <Icon type="arrow-right" />,
        click: this.onClickMenu,
      },
      {
        label: '새로고침',
        icon: <Icon type="redo" />,
        click: this.onClickMenu,
      },
      { type: 'separator' },
      { label: '다른이름으로 저장', click: this.onClickMenu },
      { label: '인쇄', click: this.onClickMenu },
      {
        label: '전송...',
        click: this.onClickMenu,
        submenu: [
          { label: '페이스북에 보내기', click: this.onClickMenu },
          { label: '이메일로 보내기', click: this.onClickMenu },
        ],
      },
      { type: 'separator' },
      { label: '페이지 소스보기', click: this.onClickMenu },
      { label: '저장', click: this.onClickMenu },
    ]);
  }
}

export default BasicExample;
