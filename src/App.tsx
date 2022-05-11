import { MotionLazyContainer } from "components/animate";
import NotistackProvider from "components/NotistackProvider";
import ScrollToTop from "components/ScrollToTop";
import ThemeSettings from "components/settings";
import Router from "Router";
import ThemeProvider from "theme";
function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <NotistackProvider>
            <ScrollToTop />
            <Router />
          </NotistackProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}

export default App;
