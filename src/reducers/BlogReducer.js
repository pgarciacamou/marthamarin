import { types } from '../actions/BlogActions';
import { combineReducers } from 'redux';

const initialState = {
  posts: []
};

function posts(prev = initialState.posts, action) {
  switch(action.type) {
    case types.CREATE_POST:
      return [
        ...prev,
        {
          title: action.title,
          content: action.content
        }
      ];
    case types.DELETE_POST:
      return prev.filter(b => b.title !== action.title);
    default:
      return prev;
  }
}

export default combineReducers({
  posts
});