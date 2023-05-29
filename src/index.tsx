// i18n
// @mui
import { ApolloProvider } from "@apollo/client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
// lightbox
import "react-image-lightbox/style.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
// editor
import "react-quill/dist/quill.snow.css";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
// scroll bar
import "simplebar/src/simplebar.css";
import "slick-carousel/slick/slick-theme.css";
// slick-carousel
import "slick-carousel/slick/slick.css";
// import { AuthProvider } from './contexts/Auth0Context';
// import { AuthProvider } from './contexts/FirebaseContext';
// import { AuthProvider } from './contexts/AwsCognitoContext';
//
import App from "./App";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";
// Check our docs
// https://docs-minimals.vercel.app/authentication/ts-version
import { AuthProvider } from "./contexts/JWTContext";
// contexts
import { SettingsProvider } from "./contexts/SettingsContext";
import "./i18n";
import apolloClient from "./lib/apolloClient";
// redux
import { persistor, store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
// highlight
import en from "date-fns/locale/en-GB";

import "./utils/highlight";
//
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <ApolloProvider client={apolloClient}>
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={en}
            >
              <SettingsProvider>
                <CollapseDrawerProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </CollapseDrawerProvider>
              </SettingsProvider>
            </LocalizationProvider>
          </PersistGate>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  </ApolloProvider>
);

reportWebVitals();
