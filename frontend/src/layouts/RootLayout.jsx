import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "../components/Theme/Theme";
import { useThemeMode } from "../providers/ThemeProviderCustom";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
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
        <Footer position="bottom" />
        <Toaster position="top-center" duration={3000} />
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
