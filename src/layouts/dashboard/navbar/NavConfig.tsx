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
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "events",
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },
      // {
      //   title: "people",
      //   path: PATH_DASHBOARD.peple.root,
      //   icon: ICONS.people,
      // },
      // {
      //   title: "blog",
      //   path: PATH_DASHBOARD.blog.posts,
      //   icon: ICONS.blog,
      // },
      // { title: "chat", path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: "clubs", path: PATH_DASHBOARD.club.root, icon: ICONS.club },
    ],
  },
];

export default navConfig;
