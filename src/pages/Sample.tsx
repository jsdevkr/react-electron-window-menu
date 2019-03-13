import * as React from 'react';

import { styled, StyledContainer } from 'styledComponents';
import { ContextMenuExample, MenuBarExample } from 'examples';
import { CodeViewer } from 'components';
import { Checkbox, Divider } from 'antd';

const contextMenuRaw = require('!raw-loader!examples/ContextMenuExample.tsx');
const menuBarRaw = require('!raw-loader!examples/MenuBarExample.tsx');
const axuiLogo = require('assets/axui-logo.png');
const GitHubButton = require('react-github-button');

const Component = styled.div`
  .app-header {
    background: #333;
    color: #fff;
    padding-top: 3em;
    padding-bottom: 3em;
    margin-bottom: 2em;

    .logo-img {
      width: 100px;
      img {
        width: 100%;
        display: block;
      }
    }
    h1 {
      color: #fff;
      font-size: 36px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      font-family: 'Montserrat', sans-serif;
    }

    .github-btn {
      .gh-count {
        margin-right: 1em;
      }
    }

    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
`;

interface IProps {}
interface IState {
  viewMenuBarRaw: boolean;
  viewBasicRaw: boolean;
}
class Index extends React.Component<IProps, IState> {
  state = {
    viewMenuBarRaw: false,
    viewBasicRaw: false,
  };

  render() {
    const { viewMenuBarRaw, viewBasicRaw } = this.state;

    return (
      <Component>
        <header className={'app-header'}>
          <StyledContainer>
            <div className={'logo-img'}>
              <img src={axuiLogo} />
            </div>
            <h1>react-electron-window-menu</h1>

            <div>
              {window.location.host !== 'localhost:3000' && (
                <>
                  <GitHubButton
                    type="stargazers"
                    namespace="jsdevkr"
                    repo="react-electron-window-menu"
                  />{' '}
                  <GitHubButton
                    type="forks"
                    namespace="jsdevkr"
                    repo="react-electron-window-menu"
                  />
                </>
              )}
              <img src="https://badge.fury.io/js/react-electron-window-menu.svg" />{' '}
              <img src="https://img.shields.io/npm/dm/react-electron-window-menu.svg" />{' '}
            </div>
          </StyledContainer>
        </header>

        <StyledContainer>
          <h2>Installation</h2>

          <CodeViewer>$ npm install react-electron-window-menu</CodeViewer>

          <CodeViewer
            code={`
import 'react-electron-window-menu/style.css';
import { ContextMenu, MenuBar } from 'react-electron-window-menu';
`}
          />

          <Divider />

          <h2>Menubar</h2>
          <MenuBarExample />

          <br />
          <p>
            <Checkbox
              onChange={e => {
                this.setState({
                  viewMenuBarRaw: e.target.checked,
                });
              }}
            >
              View Source
            </Checkbox>
          </p>
          {viewMenuBarRaw ? <CodeViewer code={menuBarRaw} /> : null}

          <Divider />

          <h2>ContextMenu</h2>
          <ContextMenuExample />
          <br />
          <p>
            <Checkbox
              onChange={e => {
                this.setState({
                  viewBasicRaw: e.target.checked,
                });
              }}
            >
              View Source
            </Checkbox>
          </p>
          {viewBasicRaw ? <CodeViewer code={contextMenuRaw} /> : null}
        </StyledContainer>
      </Component>
    );
  }
}

export default Index;
