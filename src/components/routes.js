import React from 'react';
import { render } from 'react-dom';
import { Route, IndexRoute } from 'react-router'

import App from './App';
import Home from './Home';
import Blog from './Blog';
// import About from './partials/About.jsx';
// import Projects from './partials/Projects.jsx';
// import Dashboard from './partials/Dashboard.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/admin" component={Home} />
    <Route path="/blog" component={Blog} />
    {
    // <Route path="/about" component={About}/>
    // <Route path="/projects" component={Projects}/>
    // <Route path="/dashboard" component={Dashboard}/>
    }
  </Route>
);