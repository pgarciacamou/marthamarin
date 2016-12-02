import React from "react";
import { creators } from "../actions/BlogActions";
import blogStore from "../stores/BlogStore";
import AppMixin from './AppMixin';

const boundCreators = {
  createPost: (title, content) => blogStore.dispatch(creators.createPost(title, content)),
  deletePost: (title) => blogStore.dispatch(creators.deletePost(title))
};

export default React.createClass({
  displayName: "Blog",

  mixins: [AppMixin],

  getInitialState() {
    return blogStore.getState();
  },

  componentDidMount() {
    this.unsubscribe = blogStore.subscribe(() => {
      this.setState(blogStore.getState());
    });
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  createPost() {
    return boundCreators.createPost("test", "testing");
  },

  deletePost() {
    return boundCreators.deletePost("test");
  },

  render() {
    return (
      <div>
        {this.state.posts.map((post, i) => {
          return (
            <p key={i}>{post.title} - {post.content}</p>
          );
        })}
        {this.state.isAdmin && (
          <div>
            <button onClick={this.createPost}>+</button>
            <button onClick={this.deletePost}>-</button>
          </div>
        )}
      </div>
    );
  }
});