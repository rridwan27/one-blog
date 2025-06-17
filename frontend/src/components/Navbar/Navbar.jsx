import React, { use, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Loader, LogOut, NotebookText } from "lucide-react";
import { AuthContext } from "../../providers/AuthProvider";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";
import ThemeToggle from "../Theme/ThemeToggle";
import { useThemeMode } from "../../providers/ThemeProviderCustom";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, mongoUser, loading, logOut } = use(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await axios.post(
      "https://one-blog-tr95.onrender.com/api/v1/user/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    logOut()
      .then(() => {
        navigate("/auth/sign-in");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 -mb-1  ${
            isActive
              ? "text-violet-600 font-semibold text-lg"
              : "border-transparent hover:text-violet-600 text-lg"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/add-blog"
        className={({ isActive }) =>
          `px-4 py-2 -mb-1  ${
            isActive
              ? "text-violet-600 font-semibold text-lg"
              : "border-transparent hover:text-violet-600 text-lg"
          }`
        }
      >
        Add Blog
      </NavLink>
      <NavLink
        to="/all-blogs"
        className={({ isActive }) =>
          `px-4 py-2 -mb-1  ${
            isActive
              ? "text-violet-600 font-semibold text-lg"
              : "border-transparent hover:text-violet-600 text-lg"
          }`
        }
      >
        All Blogs
      </NavLink>
      <NavLink
        to="/featured-blogs"
        className={({ isActive }) =>
          `px-4 py-2 -mb-1  ${
            isActive
              ? "text-violet-600 font-semibold text-lg"
              : "border-transparent hover:text-violet-600 text-lg"
          }`
        }
      >
        Featured Blogs
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          `px-4 py-2 -mb-1  ${
            isActive
              ? "text-violet-600 font-semibold text-lg"
              : "border-transparent hover:text-violet-600 text-lg"
          }`
        }
      >
        Wishlist
      </NavLink>
    </>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-violet-600" size={40} />
      </div>
    );
  }

  return (
    <Box
      component="header"
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 1,
        py: 2,
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container flex justify-between items-center h-12 mx-auto px-4">
        <NavLink
          to="/"
          className="flex items-center space-x-2"
          aria-label="Back to homepage"
        >
          <NotebookText className="w-8 h-8 text-violet-600" />
          <span className="text-2xl font-bold">OneBlog</span>
        </NavLink>

        <nav className="hidden lg:flex items-center space-x-1">
          <div className="flex">{links}</div>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <ThemeToggle mode={mode} toggleTheme={toggleTheme} />
          {user && mongoUser ? (
            <>
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
                sx={{ width: 50, height: 50, cursor: "pointer" }}
                onClick={handleClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <Link to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {" "}
              <NavLink
                to="/auth/sign-in"
                className="px-6 py-2 rounded-lg border font-semibold text-violet-600 border-violet-600 hover:bg-violet-600 hover:text-white transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/auth/sign-up"
                className="px-6 py-2 rounded-lg bg-violet-600 font-semibold text-white hover:bg-violet-700 transition-colors"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        <button
          className="p-2 lg:hidden cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <Box
          component="nav"
          sx={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            zIndex: 50,
            overflow: "hidden",
            transition: "all 300ms ease-in-out",
            bgcolor: "background.default",
            boxShadow: 3,
            ...(isMobileMenuOpen
              ? {
                  maxHeight: "100vh",
                  opacity: 1,
                }
              : {
                  maxHeight: 0,
                  opacity: 0,
                }),
          }}
        >
          <Box sx={{ p: 2 }}>
            <ThemeToggle mode={mode} toggleTheme={toggleTheme} />
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              {/* Main Navigation Links */}
              <NavLink
                to="/"
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  color: "text.primary",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  "&.active": {
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                }}
              >
                Home
              </NavLink>

              <NavLink
                to="/add-blog"
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  color: "text.primary",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  "&.active": {
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                }}
              >
                Add Blog
              </NavLink>

              <NavLink
                to="/all-blogs"
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  color: "text.primary",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  "&.active": {
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                }}
              >
                All Blogs
              </NavLink>

              <NavLink
                to="/featured-blogs"
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  color: "text.primary",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  "&.active": {
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                }}
              >
                Featured Blogs
              </NavLink>

              <NavLink
                to="/wishlist"
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  color: "text.primary",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  "&.active": {
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                }}
              >
                Wishlist
              </NavLink>

              {user && mongoUser ? (
                <>
                  <NavLink
                    to="/profile"
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      color: "text.primary",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                      "&.active": {
                        color: "primary.main",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    Profile
                  </NavLink>

                  <Button
                    onClick={handleLogout}
                    startIcon={<LogOut size={18} />}
                    fullWidth
                    sx={{
                      px: 2.5,
                      py: 1.2,
                      borderRadius: 2,
                      textTransform: "none",
                      color: "text.primary",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      border: "1px solid",
                      borderColor: "divider",
                      justifyContent: "center",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/auth/sign-in"
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      color: "text.primary",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    Sign In
                  </NavLink>

                  <NavLink
                    to="/auth/sign-up"
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default Navbar;
