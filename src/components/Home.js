import React from 'react';
import AppMixin from './AppMixin';

export default React.createClass({
  displayName: 'Home',
  mixins: [AppMixin],
  render() {
    return (
      <div>
        <h1>Hello {this.state.isAdmin ? "Admin" : "World"}</h1>
      </div>
    );
  }
});