// emotion
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
// @mui
import { useTheme } from "@mui/material/styles";
import { ReactNode, useEffect } from "react";
// rtl
import rtlPlugin from "stylis-plugin-rtl";

// ----------------------------------------------------------------------

interface ThemeRtlLayoutProps {
  children: ReactNode;
}
export default function ThemeRtlLayout({ children }: ThemeRtlLayoutProps) {
  const theme = useTheme();

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cacheRtl = createCache({
    key: theme.direction === "rtl" ? "rtl" : "css",
    stylisPlugins: theme.direction === "rtl" ? [rtlPlugin] : [],
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
