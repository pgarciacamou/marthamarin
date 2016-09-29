import path from 'path';
import React from 'react';
import AppMixin from './AppMixin';
import RoutesMixin from './RoutesMixin';
import { Link } from 'react-router';

var Nav = React.createClass({
  displayName: 'Nav',
  mixins: [
    AppMixin,
    RoutesMixin
  ],
  render() {
    return (
      <nav className="nav container-fluid hidden-xs hidden-sm">
        <div className="container">
          <ul>
            {this.getRoutes(this.state.baseRoute, this.state.isAdmin).map(route => (
              <li key={route.id}>
                { route.external ? 
                  <a href={route.path}> {route.name} </a> :
                  <Link to={route.path} activeClassName="active"> {route.name} </Link>
                }
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
});

export default Nav;