import * as React from 'react';

interface IProps {}
interface IState {
  emails: string[];
}
class BasicExample extends React.Component<IProps, IState> {
  state = {
    emails: [],
  };

  render() {
    const { emails } = this.state;

    return <>TEST</>;
  }
}

export default BasicExample;
