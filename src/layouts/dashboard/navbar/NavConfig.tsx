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
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      { title: "app", path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
    ],
  },
];

export default navConfig;
