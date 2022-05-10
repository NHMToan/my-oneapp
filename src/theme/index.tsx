// @mui
import { CssBaseline, ThemeOptions } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { ReactNode, useMemo } from "react";
// hooks
import useSettings from "../hooks/useSettings";
import breakpoints from "./breakpoints";
import componentsOverride from "./overrides";
//
import palette from "./palette";
import shadows, { customShadows } from "./shadows";
import typography from "./typography";

// ----------------------------------------------------------------------

interface ThemeProviderProps {
  children: ReactNode;
}

export interface AppThemeProps extends ThemeOptions {
  palette: any;
  typography: any;
  breakpoints: any;
  shape: any;
  direction: any;
  shadows: any;
  customShadows: any;
}
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeMode, themeDirection } = useSettings();

  const isLight = themeMode === "light";

  const themeOptions: AppThemeProps = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
