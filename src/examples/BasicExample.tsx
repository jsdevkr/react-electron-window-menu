import * as React from 'react';

import ContextMenu, { IAXUIContextMenu } from 'axui-contextmenu';
import { styled } from 'styledComponents';

const menu = new ContextMenu({ id: 'basic' });
menu.setMenu([]);

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
    menu.popup();
  };

  render() {
    return (
      <Container onContextMenu={this.handleContextMenu}>
        Right mouse click here
      </Container>
    );
  }
}

export default BasicExample;
