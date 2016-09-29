import path from 'path';
import React from 'react';
import AppMixin from './AppMixin';
import { Link } from 'react-router';

var Nav = React.createClass({
  displayName: 'Nav',
  mixins: [AppMixin],
  getRoutes() {
    return [
      {
        id: 1,
        path: path.join(this.state.baseRoute, "/"),
        name: "Home"
      },
      {
        id: 2,
        path: this.state.isAdmin ? '/logout' : '/login',
        name: this.state.isAdmin ? 'Logout' : 'Login',
        external: true
      }
    ];
  },
  render() {
    return (
      <nav className="container-fluid">
        <div className="container">
          <ul>
            {this.getRoutes().map(route => (
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