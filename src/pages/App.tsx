import * as React from 'react';
import 'styles/globals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { NoMatch, ErrorBoundary } from 'components';
import 'styles/globals';
import Samples from './Sample';

class App extends React.Component<any> {
  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Samples} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

export default hot(App);
