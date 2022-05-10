// @mui
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { ReactNode } from "react";
// hooks
import useLocales from "../../hooks/useLocales";

// ----------------------------------------------------------------------
interface ThemeLocalizationProps {
  children: ReactNode;
}

export default function ThemeLocalization({
  children,
}: ThemeLocalizationProps) {
  const defaultTheme = useTheme();

  const { currentLang } = useLocales();

  const theme = createTheme(defaultTheme, currentLang.systemValue);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
