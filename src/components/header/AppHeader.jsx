import React from "react";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

export default function AppHeader() {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky" // Stays at the top, pushes content down
      color="transparent" // Transparent background
      elevation={0} // No shadow
      className="user-select-none"
      sx={{
        paddingX: {
          xs: theme.spacing(1),
          sm: theme.spacing(2),
          md: theme.spacing(3),
          lg: theme.spacing(4),
        }, // Responsive horizontal padding
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        marginBottom: theme.spacing(1), // Space between app bar and chat window
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: theme.spacing(6) }}>
        {" "}
        {/* disableGutters removes default padding */}
        {/* Left Section: Verve with Tag */}
        <Box
          className="pe-none"
          sx={{ display: "flex", alignItems: "center", gap: theme.spacing(1) }}
        >
          <Avatar
            alt="Verve Image"
            src="/verve.png"
            sx={{ width: "3.5rem", height: "3.5rem" }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              WebkitBackgroundClip: "text",
              fontSize: {
                xs: "1.5rem",
                sm: "1.75rem",
              },
              letterSpacing: "-0.025em", // Slightly tighter spacing
            }}
          >
            Verve
          </Typography>
          <Typography
            variant="caption" // Smaller text for the tag
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
              marginTop: theme.spacing(0.5), // Slightly align with the bottom of Verve
            }}
          >
            Dynamic narratives, forged by decisions
          </Typography>
        </Box>
        {/* This Box pushes content to the right */}
        <Box sx={{ flexGrow: 1 }} />
        {/* Right Section: Settings Button */}
        <IconButton
          color="inherit" // Inherits color from AppBar's text/primary
          aria-label="settings"
          // onClick={handleSettingsOpen} // Add actual handler later
          sx={{
            color: theme.palette.text.secondary, // Use secondary text color for icons
            "&:hover": {
              color: theme.palette.text.primary, // Darker on hover
            },
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
