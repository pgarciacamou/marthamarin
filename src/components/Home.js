import React from 'react'

export default React.createClass({
  displayName: 'Home',
  getInitialState() {
    return {
      admin: document.body.classList.contains("admin")
    };
  },
  render() {
    return (
      <div>
        <h1>Hello {this.state.admin ? "Admin" : "World"}</h1>
      </div>
    );
  }
});