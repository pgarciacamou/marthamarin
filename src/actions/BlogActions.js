/**
 * ACTION TYPES
 */

export const types = {
  CREATE_POST: "CREATE_POST",
  DELETE_POST: "DELETE_POST"
};

/**
 * ACTION CREATORS
 */

export const creators = {
  createPost(title, content) {
    return { type: types.CREATE_POST, title, content };
  },
  deletePost(title) {
    return { type: types.DELETE_POST, title };
  }
};