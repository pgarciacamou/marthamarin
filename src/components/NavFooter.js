import React from 'react';
import ReactDOM from 'react-dom';
import AppMixin from './AppMixin';
import RoutesMixin from './RoutesMixin';
import { Link } from 'react-router';

var NavFooter = React.createClass({
  displayName: 'NavFooter',
  mixins: [
    AppMixin,
    RoutesMixin
  ],
  handleButtonClick() {
    var nav = ReactDOM.findDOMNode(this);
    nav.classList.toggle("active");
  },
  render() {
    return (
      <nav className="nav-footer visible-xs visible-sm">
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
        <div className="button" onClick={this.handleButtonClick}>
          <span>Menu</span>
        </div>
      </nav>
    );
  }
});

export default NavFooter;