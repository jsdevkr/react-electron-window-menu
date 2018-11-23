import * as react from 'react';
import { createGlobalStyle } from 'styled-components';

const Normalize: react.ComponentType = require('styled-normalize').Normalize;
export { Normalize };
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
