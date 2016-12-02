import React from 'react';

export default React.createClass({
  displayName: "NotFound",

  render() {
    return (
      <div className="not-found">
        <section className="container">
          <h1>The page you are looking for, doesn't exist.</h1>
        </section>
      </div>
    );
  }
});