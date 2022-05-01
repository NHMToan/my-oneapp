import ScrollToTop from "components/ScrollToTop";
import AuthContextProvider from "contexts/AuthContext";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <AuthContextProvider>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
