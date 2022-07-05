import { enUS, viVN } from "@mui/material/locale";
import { PATH_DASHBOARD } from "Router/paths";

export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app;

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

// SETTINGS
// ----------------------------------------------------------------------

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

export const defaultSettings = {
  themeMode: "light",
  themeDirection: "ltr",
  themeContrast: "default",
  themeLayout: "horizontal",
  themeColorPresets: "default",
  themeStretch: false,
};

// MULTI LANGUAGES
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    icon: "emojione-v1:flag-for-united-kingdom",
  },
  {
    label: "Tiếng việt",
    value: "vn",
    systemValue: viVN,
    icon: "twemoji:flag-vietnam",
  },
  {
    label: "Chinese",
    value: "cn",
    systemValue: viVN,
    icon: "twemoji:flag-china",
  },
];

export const defaultLang = allLangs[0]; // English
