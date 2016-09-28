import React from 'react';
// import { Nav, ToggleButton } from './components/Nav.js';
import { $ } from '../scripts/utils'; 

var navActiveClass = "show-menu";

export default React.createClass({
  displayName: 'App',
  // menuSwitch: cssSwitch($("#app"), navActiveClass),
  render() {
    return (
      <div>
        {this.props.children}
        {
        // <div className="nav-wrapper">
        //   <Nav menu={this.menuSwitch}/>
        // </div>
        // <div className="app-wrapper">
        //   <div className="container app-container">
        //     {this.props.children}
        //   </div>
        // </div>
        
        // <ToggleButton menu={this.menuSwitch}/>
        }
      </div>
    );
  }
});
