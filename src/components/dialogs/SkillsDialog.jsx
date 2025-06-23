// src/components/dialogs/SkillsDialog.jsx
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ParaglidingIcon from "@mui/icons-material/Paragliding";
import CasinoIcon from "@mui/icons-material/Casino";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import DialogContentText from "@mui/material/DialogContentText";
import Divider from "@mui/material/Divider";

/**
 * @typedef {Object}  Skill
 * @property {string} name
 * @property {number} level
 * @property {NarrativeEffect[]} effects
 */

/**
 * @typedef {Object} Skillset
 * @property {Skill} vitality
 * @property {Skill} empathy
 * @property {Skill} reason
 * @property {Skill} bravado
 * @property {Skill} awareness
 * @property {Skill} luck
 *
 */

/**
 *
 * @param level {int}
 * @param effects
 * @returns {Chip}
 * @constructor
 */
function SkillLevel({ level = 0, effects = [] }) {
  const modifier = effects
    .map((effect) => effect.value)
    .reduce((a, b) => a + b, 0);

  const getColor = (value) =>
    value > 0 ? "success.main" : value < 0 ? "error.main" : "text.primary";

  const tooltip = (
    <div>
      <Typography>Base</Typography>
      <Divider />
      <Typography
        variant="body1"
        component="p"
        sx={{ padding: "0.2rem 0", marginBottom: "1rem" }}
      >
        {level}
      </Typography>
      <Typography>Effects</Typography>
      <Divider />
      {effects.length > 0 ? (
        effects.map((effect) => (
          <Typography
            color={getColor(effect.value)}
            variant="body1"
            component="p"
            sx={{ padding: "0.2rem 0" }}
            key={effect.name}
          >
            {effect.value > 0 && "+"}
            {effect.value} {effect.name}
          </Typography>
        ))
      ) : (
        <Typography variant="body1" component="p" sx={{ padding: "0.2rem 0" }}>
          None
        </Typography>
      )}
    </div>
  );

  return (
    <Tooltip title={tooltip} placement="top" arrow>
      <Chip
        label={level + modifier}
        variant="outlined"
        sx={{
          fontSize: "1.2rem",
          color: getColor(modifier),
        }}
      />
    </Tooltip>
  );
}

/**
 * Dialog component to display the player's skills.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the dialog is open.
 * @param {Function} props.onClose - Callback function to close the dialog.
 * @param {Skillset} props.skills - An array of skill data.
 * @returns {React.JSX.Element} The rendered SkillsDialog component.
 */
function SkillsDialog({ open, onClose, skills }) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md" // Limit max width
        // Take full width up to maxWidth
        sx={{}}
      >
        <DialogTitle
          sx={{
            padding: theme.spacing(1, 2),
            backgroundColor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h2" component="h2">
              Skills
            </Typography>
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          <DialogContentText variant="body1" color="text.primary">
            The <b>V.E.R.B.A.L</b> skillset defines your character’s innate
            strengths and weaknesses. It's the foundation upon which choices are
            made, challenges are faced, and the world is perceived.
            <br /> These attributes shape not only what you can do, but how you
            are seen, remembered, and transformed.
          </DialogContentText>
          <List sx={{ letterSpacing: "0.1em" }}>
            {/* Vitality */}
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "error.light",
                  }}
                >
                  <FitnessCenterIcon />
                </Avatar>
              </ListItemAvatar>
              <Tooltip title="Determines how well you withstand pain, fatigue, and injury, as well as your capacity for sustained effort.">
                <ListItemText
                  primary="Vitality"
                  secondary="Physical endurance, resilience, and raw strength"
                  slotProps={{
                    primary: { fontSize: "1.5rem" },
                    secondary: { fontSize: "1rem" },
                  }}
                />
              </Tooltip>
              <SkillLevel
                level={skills?.vitality?.level}
                effects={skills?.vitality?.effects}
              />
            </ListItem>
            {/* Empathy */}
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "secondary.light",
                  }}
                >
                  <Diversity1Icon />
                </Avatar>
              </ListItemAvatar>
              <Tooltip title="Your ability to connect with others, sense their emotions, and inspire trust or compassion. Empathy opens paths through understanding rather than force.">
                <ListItemText
                  primary="Empathy"
                  secondary="Understanding, connection, mirroring"
                  slotProps={{
                    primary: { fontSize: "1.5rem" },
                    secondary: { fontSize: "1rem" },
                  }}
                />
              </Tooltip>
              <SkillLevel
                level={skills?.empathy?.level}
                effects={skills?.empathy?.effects}
              />
            </ListItem>
            {/* Reason */}
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "info.light",
                  }}
                >
                  <PsychologyIcon />
                </Avatar>
              </ListItemAvatar>
              <Tooltip title="Governs how well you analyze, deduce, and outthink both puzzles and others.">
                <ListItemText
                  primary="Reason"
                  secondary="Intellect, logic, and problem-solving ability"
                  slotProps={{
                    primary: { fontSize: "1.5rem" },
                    secondary: { fontSize: "1rem" },
                  }}
                />
              </Tooltip>
              <SkillLevel
                level={skills?.reason?.level}
                effects={skills?.reason?.effects}
              />
            </ListItem>
            {/* Bravado */}
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "warning.light",
                  }}
                >
                  <ParaglidingIcon />
                </Avatar>
              </ListItemAvatar>
              <Tooltip title="Your confidence, daring, and force of personality. Bravado fuels bold actions, bluffs, and the courage to defy the odds when others would falter.">
                <ListItemText
                  primary="Bravado"
                  secondary="Guts, charm, confidence"
                  slotProps={{
                    primary: { fontSize: "1.5rem" },
                    secondary: { fontSize: "1rem" },
                  }}
                />
              </Tooltip>
              <SkillLevel
                level={skills?.bravado?.level}
                effects={skills?.bravado?.effects}
              />
            </ListItem>
            {/* Awareness */}
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "primary.light",
                  }}
                >
                  <CrisisAlertIcon />
                </Avatar>
              </ListItemAvatar>
              <Tooltip title="Your sensitivity to detail, hidden threats, and subtle shifts in your surroundings. Awareness protects you from unseen dangers and reveals truths that others miss.">
                <ListItemText
                  primary="Awareness"
                  secondary="Perception, environmental sensitivity"
                  slotProps={{
                    primary: { fontSize: "1.5rem" },
                    secondary: { fontSize: "1rem" },
                  }}
                />
              </Tooltip>
              <SkillLevel
                level={skills?.awareness?.level}
                effects={skills?.awareness?.effects}
              />
            </ListItem>
            {/* Luck */}
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "success.light",
                  }}
                >
                  <CasinoIcon />
                </Avatar>
              </ListItemAvatar>
              <Tooltip title="The invisible hand of chance that sometimes bends the world in your favor — or against it. Luck can’t be controlled, but when it strikes, its effects are undeniable.">
                <ListItemText
                  primary="Luck"
                  secondary="Chance, fate, poetic chaos"
                  slotProps={{
                    primary: { fontSize: "1.5rem" },
                    secondary: { fontSize: "1rem" },
                  }}
                />
              </Tooltip>
              <SkillLevel
                level={skills?.luck?.level}
                effects={skills?.luck?.effects}
              />
            </ListItem>
          </List>
        </DialogContent>
        {/* Add DialogActions if you need buttons at the bottom */}
      </Dialog>
    </React.Fragment>
  );
}

export default SkillsDialog;
