// src/components/ProtagonistCard.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ImageIcon from "@mui/icons-material/Image"; // Using ImageIcon for placeholder again
import BackpackIcon from "@mui/icons-material/Backpack"; // Inventory Icon
import GroupIcon from "@mui/icons-material/Group"; // Relationships Icon
import TrackChangesIcon from "@mui/icons-material/TrackChanges"; // Skills Icon
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";

/**
 * @typedef {Object} Trait
 * @property {string} id
 * @property {string} name
 * @property {string} color // Hex color for the chip, e.g., '#FFDF72'
 */

/**
 * ProtagonistCard component displays information about the player character.
 *
 * @param {Object} props - The component props.
 * @param {Character} props.protagonist - The player character data.
 * @returns {React.JSX.Element|null} The rendered ProtagonistCard component.
 */
function ProtagonistCard({ protagonist }) {
  const theme = useTheme();

  if (!protagonist) {
    return null; // Or render a loading/empty state
  }

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: "1rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        minWidth: "18rem", // Keep min/max width consistent with SceneInfoCard
        maxWidth: "22rem",
        overflowY: "auto", // Allow scrolling for card content
        display: "flex",
        flexDirection: "column",
        marginX: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
          flexShrink: 0,
        }}
      >
        {protagonist.avatarUrl ? (
          <CardMedia
            component="img"
            image={protagonist.avatarUrl}
            alt={protagonist.name}
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
      <CardContent sx={{ flexGrow: 1, padding: theme.spacing(2) }}>
        {/* Protagonist Name */}
        <Typography
          variant="h2"
          component="h2"
          sx={{ fontWeight: "bold", marginBottom: theme.spacing(1) }}
        >
          {protagonist.name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            marginBottom: theme.spacing(2),
          }}
        >
          {protagonist.description}
        </Typography>

        {/* Traits / Effects */}
        {protagonist.traits && protagonist.traits.length > 0 && (
          <Box sx={{ marginY: theme.spacing(2) }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: theme.spacing(1) }}
            >
              Effects
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {protagonist.traits.map((trait, index) => (
                <Tooltip
                  title={
                    trait.description ? trait.description : "Unknown Effect"
                  }
                  key={trait.id}
                >
                  <Chip
                    key={index}
                    label={trait.name}
                    size="small"
                    color={trait.color}
                    sx={{
                      borderRadius: "0.5rem",
                      padding: "0.1rem 0.5rem",
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Box>
        )}

        {/* Inventory, Relationships, Skills sections */}
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BackpackIcon />
                </ListItemIcon>
                <ListItemText primary="Inventory" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Relationships" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TrackChangesIcon />
                </ListItemIcon>
                <ListItemText primary="Skills" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProtagonistCard;
