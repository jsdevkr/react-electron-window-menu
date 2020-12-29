import { createGlobalStyle } from 'styled-components';

import './antd-theme.less';
import 'react-github-button/assets/style.css';

export const GlobalStyles = createGlobalStyle`
  .clearfix:before, .clearfix:after {
    content: " ";
    display: table;
  }
  .clearfix:after {
    clear: both;
  }
  
  @import url('https://fonts.googleapis.com/css?family=Montserrat');
`;
