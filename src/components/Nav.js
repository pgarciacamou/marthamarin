import React from 'react';
import AppMixin from './AppMixin';

var Nav = React.createClass({
  displayName: 'Nav',
  mixins: [AppMixin],
  render() {
    return (
      <nav className="container-fluid">
        <div className="container">
          <ul>
            <li><a href={this.state.baseRoute + "/admin"}>admin</a></li>
          </ul>
        </div>
      </nav>
    );
  }
});

export default Nav;