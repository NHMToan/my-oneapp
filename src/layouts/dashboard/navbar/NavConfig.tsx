// routes

import SvgIconStyle from "components/SvgIconStyle";
import { PATH_DASHBOARD } from "Router/paths";

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  dashboard: getIcon("ic_kanban"),
  blog: getIcon("ic_blog"),
  people: getIcon("ic_user"),
  chat: getIcon("ic_chat"),
  club: getIcon("ic_menu_item"),
  rating: getIcon("ic_label"),
  lock: getIcon("ic_lock"),
  banking: getIcon("ic_banking"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      {
        title: "menu.home",
        path: PATH_DASHBOARD.root,
        icon: ICONS.banking,
      },
      {
        title: "menu.events",
        path: PATH_DASHBOARD.event,
        icon: ICONS.dashboard,
      },
      {
        title: "menu.ratings",
        path: PATH_DASHBOARD.rating.root,
        icon: ICONS.rating,
      },
      // {
      //   title: "people",
      //   path: PATH_DASHBOARD.peple.root,
      //   icon: ICONS.people,
      // },
      // {
      //   title: "menu.blog",
      //   path: PATH_DASHBOARD.blog.posts,
      //   icon: ICONS.blog,
      // },
      // { title: "chat", path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },

      { title: "menu.clubs", path: PATH_DASHBOARD.club.root, icon: ICONS.club },
      {
        title: "menu.admin",
        isAdmin: true,
        path: PATH_DASHBOARD.adminRating.root,
        icon: ICONS.lock,
        children: [
          { title: "menu.ratings", path: PATH_DASHBOARD.adminRating.root },
        ],
      },
    ],
  },
];

export default navConfig;
