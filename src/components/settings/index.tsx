import { ReactNode } from "react";
//
import SettingsDrawer from "./drawer";
import ThemeColorPresets from "./ThemeColorPresets";
//
import ThemeContrast from "./ThemeContrast";
import ThemeLocalization from "./ThemeLocalization";
import ThemeRtlLayout from "./ThemeRtlLayout";

// ----------------------------------------------------------------------

interface ThemeSettingsProps {
  children: ReactNode;
}

export default function ThemeSettings({ children }: ThemeSettingsProps) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        <ThemeLocalization>
          <ThemeRtlLayout>
            {children}
            <SettingsDrawer />
          </ThemeRtlLayout>
        </ThemeLocalization>
      </ThemeContrast>
    </ThemeColorPresets>
  );
}
