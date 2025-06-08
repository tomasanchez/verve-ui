// src/components/ChatInput.jsx
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle"; // Plus icon
import TuneIcon from "@mui/icons-material/Tune"; // Tools icon
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material"; // For custom styling

// Constants for TextField height control
const CHAT_INPUT_MAX_ROWS = 6;
const CHAT_INPUT_MIN_ROWS = 1;

function ChatInput({
  inputValue,
  onInputChange,
  onSendMessage,
  placeholder = "Ask anything",
  disabled = false,
}) {
  const theme = useTheme();

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Send on Enter, new line on Shift+Enter
      event.preventDefault(); // Prevent default new line behavior
      if (!disabled) {
        onSendMessage();
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end", // Align items to the bottom (text field expands upwards)
        padding: theme.spacing(1, 2), // Responsive padding
        backgroundColor: "background.default",
        borderTop: "0.1rem solid",
        borderColor: theme.palette.divider,
        position: "sticky",
        bottom: 0,
        zIndex: 100,
        // Max width for content on larger screens, centered
        width: "100%",
        maxWidth: { xs: "100%", sm: "600px", md: "750px", lg: "900px" },
        margin: "2.5rem auto",
      }}
    >
      {/* This is the main rounded input container itself */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Children (TextField and buttons) stack vertically
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper,
          borderRadius: "1.5rem",
          padding: "0.25rem", // Padding around the inner elements
          gap: theme.spacing(0.5),
          boxShadow: theme.shadows[3],
          border: `1px solid ${theme.palette.divider}`,
          position: "relative", // Context for absolutely positioned button bar
          minHeight: "2rem", // Minimum height for the input box (adjust as needed)
          overflow: "hidden", // Ensures content stays within rounded corners
          transition: "height 0.3s ease",
        }}
      >
        <TextField
          multiline
          minRows={CHAT_INPUT_MIN_ROWS}
          maxRows={CHAT_INPUT_MAX_ROWS}
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled} // Disable the text field itself
          sx={{
            // Styles for the TextField component itself
            backgroundColor: "transparent", // TextField background is transparent
            "& .MuiOutlinedInput-root": {
              // Target the root of the outlined input (where border and padding are usually)
              padding: theme.spacing(1, 1.5), // Adjust padding for the actual text area
              "& fieldset": {
                border: "none", // Remove the default border
              },
              "&:hover fieldset": {
                border: "none !important",
              },
              "&.Mui-focused fieldset": {
                border: "none !important",
              },
            },
            "& .MuiInputBase-inputMultiline": {
              // Target the actual textarea element within the TextField
              lineHeight: "1.5rem", // Consistent line height
              padding: 0, // Remove default textarea padding, already handled by MuiOutlinedInput-root
              // Remove `flexGrow: 1` from here, as its parent is column, not row.
            },
          }}
        />
        {/* Buttons container - positioned absolutely at the bottom of the main input box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // Pushes left buttons to left, right buttons to right
            alignItems: "flex-end", // Align individual icons to the bottom of this row
            padding: "0.5rem 0.5rem", // Padding within this button row
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1, // Ensure buttons are on top of text if text overlaps (unlikely with maxHeight)
          }}
        >
          {/* Left group of buttons */}
          <Box
            sx={{
              display: "flex",
              gap: theme.spacing(0.5),
              alignItems: "flex-end",
            }}
          >
            <IconButton color="primary">
              <AddCircleIcon sx={{ fontSize: "1.75rem" }} /> {/* Larger icon */}
            </IconButton>
            <Button
              variant="text"
              startIcon={<TuneIcon />}
              sx={{
                borderRadius: "1.25rem",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                color: theme.palette.text.secondary,
                "& .MuiButton-startIcon": {
                  marginRight: "0.25rem",
                },
              }}
            >
              Tools
            </Button>
          </Box>
          {/* Right Group */}
          <Box
            sx={{
              display: "flex",
              gap: theme.spacing(0.5),
              alignItems: "flex-end",
            }}
          >
            <IconButton
              color="primary"
              onClick={onSendMessage}
              disabled={disabled || !inputValue.trim()}
            >
              <Tooltip title="Submit">
                <SendIcon sx={{ fontSize: "1.75rem" }} /> {/* Larger icon */}
              </Tooltip>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatInput;
