import * as React from 'react';

import ContextMenu, { IAXUIContextMenu } from 'axui-contextmenu';
import { styled } from 'styledComponents';

const menu = new ContextMenu({ id: 'basic' });
menu.setMenu([{ label: 'menu1' }, { label: 'menu2' }]);

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
    menu.popup({ x: e.clientX, y: e.clientY });
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
