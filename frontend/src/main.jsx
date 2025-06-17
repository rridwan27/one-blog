import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/Router";
import AuthProvider from "./providers/AuthProvider";
import { ThemeProviderCustom } from "./providers/ThemeProviderCustom";
import { useThemeMode } from "./providers/ThemeProviderCustom";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./components/Theme/Theme";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import { Loader } from "lucide-react";

// let persistor = persistStore(store);

const AppWithTheme = () => {
  const { mode } = useThemeMode();
  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </MUIThemeProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProviderCustom>
        <AppWithTheme />
      </ThemeProviderCustom>
    </AuthProvider>
  </StrictMode>
);
