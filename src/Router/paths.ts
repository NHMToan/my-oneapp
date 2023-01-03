function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "";

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
  root: "/home",
  general: {
    app: "/home",
  },
  user: {
    account: path(ROOTS_DASHBOARD, "/user/account"),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    profile: (uuid) => path(ROOTS_DASHBOARD, `/user/${uuid}/`),
  },
  peple: {
    root: path(ROOTS_DASHBOARD, "/people"),
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
  club: {
    root: path(ROOTS_DASHBOARD, "/club"),
    new: path(ROOTS_DASHBOARD, "/club/new"),
    view: (uuid) => path(ROOTS_DASHBOARD, `/club/${uuid}`),
    event: (uuid) => path(ROOTS_DASHBOARD, `/club/${uuid}/event/`),
    eventNew: (uuid) => path(ROOTS_DASHBOARD, `/club/${uuid}/event/create`),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, "/chat"),
    new: path(ROOTS_DASHBOARD, "/chat/new"),
    view: (uuid) => path(ROOTS_DASHBOARD, `/chat/${uuid}`),
  },
  notification: "/notification",
  rating: {
    root: path(ROOTS_DASHBOARD, "/rating"),
  },
  adminRating: {
    root: path(ROOTS_DASHBOARD, "/admin-rating"),
    new: path(ROOTS_DASHBOARD, "/admin-rating/new"),
    view: (uuid) => path(ROOTS_DASHBOARD, `/admin-rating/${uuid}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/admin-rating/${id}/edit`),
  },
};
