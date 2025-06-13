// src/components/SceneInfoCard.jsx
import React from "react";
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
import { useTheme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";

/**
 *
 * @param {Setting} place
 * @param {[Character]} characters
 * @returns {React.JSX.Element|null}
 */
function SceneInfoCard({ place, characters }) {
  const theme = useTheme();

  if (!place) {
    return null; // Or render a loading/empty state
  }

  // Format date and time for display
  const formatDateTime = (date) => {
    const optionsDate = { month: "short", day: "numeric", year: "numeric" };
    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };
    return `${date.toLocaleTimeString("en-US", optionsTime)} • ${date.toLocaleDateString("en-US", optionsDate)}`;
  };

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
            <AvatarGroup max={4}>
              {characters.map((char) => (
                <Tooltip title={char.name} key={char.id} arrow>
                  <Avatar
                    key={char.id}
                    alt={char.name}
                    src={char.avatarUrl}
                    sx={{
                      width: "2.5rem", // Adjust avatar size
                      height: "2.5rem",
                    }}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default SceneInfoCard;
