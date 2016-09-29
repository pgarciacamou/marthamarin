import React from 'react';
import AppMixin from './AppMixin';

export default React.createClass({
  displayName: 'Home',
  mixins: [AppMixin],
  render() {
    return (
      <div className="home">
        <section className="container">
          <h1>Hello {this.state.isAdmin ? "Martha" : "World"}</h1>
        </section>
        <section className="example-banner">
          <div className="container">
            <h2>Something</h2>
            <p>Some text</p>
          </div>
        </section>
      </div>
    );
  }
});