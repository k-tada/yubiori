import React, { Component } from 'react';

export default class Main extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className="hoge">{ this.props.children }</div>
    );
  }
}

