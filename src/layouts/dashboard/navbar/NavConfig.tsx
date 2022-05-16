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
  dashboard: getIcon("ic_dashboard"),
  blog: getIcon("ic_blog"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "home",
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard,
      },
      {
        title: "blog",
        path: PATH_DASHBOARD.blog.posts,
        icon: ICONS.blog,
      },
    ],
  },
];

export default navConfig;
