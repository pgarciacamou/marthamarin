import React from 'react';

export default {
  getInitialState() {
    return {
      admin: document.body.classList.contains("admin")
    };
  }
};