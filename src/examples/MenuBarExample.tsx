import * as React from 'react';

import { MenuBar, IREWMenu } from 'react-electron-window-menu';
import 'react-electron-window-menu/style.scss';
import { styled } from 'styledComponents';
import { Icon } from 'antd';

const Container = styled.div`
  height: 200px;
  background: #467bff;
  padding: 10px;
  overflow: auto;
  .menubar-container {
    padding: 0 10px;
    height: 25px;
    background: #eee;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);

    font-size: 12px;
  }
`;

interface IProps {}
interface IState {}

class MenuBarExample extends React.Component<IProps, IState> {
  state = {};

  constructor(props: IProps) {
    super(props);
  }

  onClickMenu: IREWMenu.OnClickItem = (menuItem, w, e) => {
    console.log(menuItem);
  };

  render() {
    return (
      <Container>
        <div className="menubar-container">
          <MenuBar
            style={{ height: '25px' }}
            submenu={{
              style: { minWidth: '150px' },
              placement: 'bottom',
            }}
            items={[
              {
                label: 'File',
                submenu: [
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
                ],
              },
              {
                label: 'Edit',
                submenu: [
                  {
                    label: 'Undo',
                    accelerator: 'Cmd+Z',
                    click: this.onClickMenu,
                  },
                  {
                    label: 'Redo',
                    accelerator: 'Cmd++Shift+Z',
                    click: this.onClickMenu,
                  },
                ],
              },
              {
                label: 'Selection',
                submenu: [
                  {
                    label: 'Select All',
                    click: this.onClickMenu,
                  },
                ],
              },
            ]}
          />
        </div>
      </Container>
    );
  }
}

export default MenuBarExample;
