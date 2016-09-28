import React from 'react';

export default {
  getInitialState() {
    var isAdmin = document.body.classList.contains("admin");
    var baseRoute = isAdmin ? "/admin" : "";

    return {
      isAdmin,
      baseRoute
    };
  }
};