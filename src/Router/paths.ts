function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  newPassword: path(ROOTS_AUTH, "/new-password"),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "/app"),
  },
  user: {
    account: path(ROOTS_DASHBOARD, "/user/account"),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    profile: path(ROOTS_DASHBOARD, "/user/profile"),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, "/blog"),
    posts: path(ROOTS_DASHBOARD, "/blog/posts"),
    new: path(ROOTS_DASHBOARD, "/blog/new"),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/blog/post/${id}/edit`),
    demoView: path(
      ROOTS_DASHBOARD,
      "/blog/post/apply-these-7-secret-techniques-to-improve-event"
    ),
  },
};
