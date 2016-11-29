import path from 'path';

export default {
  getRoutes(baseRoute, isAdmin) {
    return [
      {
        id: 1,
        path: path.join(baseRoute, "/"),
        name: "Home"
      },
      {
        id: 2,
        path: path.join(baseRoute, "/blog"),
        name: "Blog"
      },
      {
        id: 3,
        path: isAdmin ? '/logout' : '/login',
        name: isAdmin ? 'Logout' : 'Login',
        external: true
      }
    ];
  }
};