// src/components/SceneInfoCard.jsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack"; // For easily spacing chips
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ImageIcon from "@mui/icons-material/Image"; // Placeholder icon
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

/**
 * SceneInfoCard component displays information about the current scene.
 *
 * @param {Object} props - The component props.
 * @param {Setting} props.place - The current setting/place data.
 * @param {Character[]} props.characters - An array of characters in the current scene.
 * @returns {React.JSX.Element} The rendered SceneInfoCard component.
 */
function SceneInfoCard({ place, characters }) {
  if (!place) {
    return <></>; // Or render a loading/empty state
  }

  const theme = useTheme();

  // State for the avatar group overflow menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handles opening the menu when the +N avatar is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handles closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Format date and time for display
  const formatDateTime = (date) => {
    if (date === null || date === undefined || date === "") {
      return "Unknown";
    }

    const optionsDate = { month: "short", day: "numeric", year: "numeric" };
    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };
    return `${date.toLocaleTimeString("en-US", optionsTime)} • ${date.toLocaleDateString("en-US", optionsDate)}`;
  };

  // max={4} means AvatarGroup will show 3 individual avatars + 1 for the overflow (+N)
  const maxAvatarsInGroup = 4;
  // Calculate characters that will be in the menu (those beyond the 'max' - 1 visible)
  const charactersInMenu = characters.slice(maxAvatarsInGroup - 1);

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: "1rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        minWidth: "18rem", // A fixed minimum width for the card itself
        maxWidth: "22rem", // Max width for larger screens
        overflowY: "hidden", // Scroll content if it overflows vertically
        display: "flex",
        flexDirection: "column",
        // Optional: padding within the card if needed, but CardContent handles it well
        marginX: "1rem",
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: "1rem", // Match card border radius
          borderTopRightRadius: "1rem",
          flexShrink: 0, // Prevent image area from shrinking
        }}
      >
        {place.imageUrl ? (
          <CardMedia
            component="img"
            image={place.imageUrl}
            alt={place.name}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
            }}
          />
        ) : (
          <ImageIcon
            sx={{ fontSize: "4rem", color: theme.palette.text.secondary }}
          />
        )}
      </Box>

      {/* Card Content Section */}
      <CardContent
        sx={{ flexGrow: 1, padding: theme.spacing(2), overflowY: "auto" }}
      >
        {/* Date and Time */}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            marginBottom: theme.spacing(1),
          }}
        >
          {formatDateTime(place.timestamp)}
        </Typography>

        {/* Place Name */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            marginBottom: theme.spacing(1),
          }}
        >
          {place.name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            marginBottom: theme.spacing(2),
          }}
        >
          {place.description}
        </Typography>

        {/* Place Effects */}
        {place.effects && place.effects.length > 0 && (
          <Box sx={{ marginBottom: theme.spacing(2) }}>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {" "}
              {/* Stack for horizontal spacing, wrap for multiple lines */}
              {place.effects.map((effect, index) => (
                <Chip
                  key={index}
                  label={effect}
                  size="small"
                  sx={{
                    borderRadius: "0.5rem", // Slightly rounded
                    padding: "0.1rem 0.5rem", // Adjust internal padding
                    fontSize: "0.75rem", // Smaller text
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Characters in Scene */}
        {characters && characters.length > 0 && (
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: theme.spacing(1) }}
            >
              Characters in Scene
            </Typography>
            <AvatarGroup
              sx={{
                justifyContent: "start",
              }}
              max={maxAvatarsInGroup}
              // Custom props for the additional (+N) avatar
              slotProps={{
                additionalAvatar: {
                  onClick: handleClick, // Attach click handler to open menu
                  sx: {
                    backgroundColor: theme.palette.action.selected, // Background for the +N avatar
                    color: theme.palette.text.secondary,
                    fontWeight: "bold",
                    width: "3rem",
                    height: "3rem",
                    border: `0.5rem solid ${theme.palette.divider}`,
                    cursor: "pointer", // Indicate it's clickable
                  },
                },
              }}
            >
              {characters.map((char) => (
                <Tooltip title={char.name} key={char.id} arrow>
                  <Avatar
                    key={char.id}
                    alt={char.name}
                    src={char.avatarUrl}
                    sx={{
                      width: "3rem", // Adjust avatar size
                      height: "3rem",
                    }}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>

            {/* Menu for additional characters */}
            <Menu
              id="character-menu"
              anchorEl={anchorEl} // The element the menu is anchored to
              open={open} // Controls if the menu is open
              onClose={handleClose} // Closes the menu
              sx={{
                "& .MuiPaper-root": {
                  // Styles the Menu's paper (background)
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: "0.75rem",
                  boxShadow: theme.shadows[3],
                },
              }}
            >
              {/* Map over characters that should appear in the menu */}
              {charactersInMenu.map((char) => (
                <MenuItem
                  key={char.id}
                  onClick={handleClose} // Close menu when an item is clicked
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing(1),
                    color: theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover, // Subtle hover effect
                    },
                    padding: theme.spacing(1, 2), // Adjust internal padding for menu items
                  }}
                >
                  <Avatar
                    alt={char.name}
                    src={char.avatarUrl}
                    sx={{ width: "3rem", height: "3rem" }} // Slightly smaller avatars in menu
                  />
                  <Typography variant="body1">{char.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default SceneInfoCard;
