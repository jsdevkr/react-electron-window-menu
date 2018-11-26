import * as React from 'react';

import ContextMenu, { IAXUIContextMenu } from 'axui-contextmenu';
import 'axui-contextmenu/style.css';
import { styled } from 'styledComponents';

const menu = new ContextMenu({ id: 'basic' });
menu.setMenu([
  { label: '뒤로' },
  { label: '앞으로' },
  { label: '새로고침' },
  { type: 'separator' },
  { label: '다른이름으로 저장' },
  { label: '인쇄' },
  { label: '전송...' },
  { type: 'separator' },
  { label: '페이지 소스보기' },
  { label: '저장' },
]);

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
  state = {};

  handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    menu.popup({ x: e.pageX, y: e.pageY });
  };

  render() {
    return (
      <Container onContextMenu={this.handleContextMenu}>
        Right mouse click here
      </Container>
    );
  }

  componentDidMount() {
    menu.popup({ x: 300, y: 500 });
  }
}

export default BasicExample;
