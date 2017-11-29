import React from 'react';

export default class App extends React.Component {
  state = {
    component: null,
  }

  handleClick = () => {
    import('./Time').then(
      ({ default: Time }) => this.setState({ component: <Time /> })
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Show date</button>
        {this.state.component}
      </div>
    );
  }
};