import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../components/Theme/Theme";
import { useThemeMode } from "../providers/ThemeProviderCustom";
import CssBaseline from "@mui/material/CssBaseline";

const AuthLayout = () => {
  const { mode } = useThemeMode();
  const isLight = mode === "light";

  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <CssBaseline />
      <div
        className={`flex flex-col min-h-screen ${
          isLight
            ? "bg-gradient-to-b from-[#f5f7fa] to-[#e0e7ff]"
            : "bg-[#111827]"
        }`}
      >
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>

        <Toaster position="top-center" duration={3000} />
      </div>
    </ThemeProvider>
  );
};

export default AuthLayout;
