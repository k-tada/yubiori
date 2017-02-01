import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Main extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className="hoge">
        <Link to="redux">Redux</Link>
      </div>
    );
  }
}

