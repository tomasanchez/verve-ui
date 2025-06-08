// src/components/ChatMessage.jsx
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import TypingEffect from "./TypingEffect.jsx";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { Fade, Tooltip } from "@mui/material";

function MessageActions({ messageText, align = "right", sx = {} }) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  // Effect to reset the 'copied' state after a couple of seconds
  useEffect(() => {
    let timeoutId;
    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset 'copied' state after 2 seconds
    }
    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or re-render
  }, [copied]);

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0"; // Make it invisible

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        setCopied(true);
      } else {
        console.warn(
          'Fallback copy failed: document.execCommand("copy") was unsuccessful.',
        );
      }
    } catch (err) {
      console.error("Fallback copy failed: ", err);
    }

    document.body.removeChild(textArea);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true); // Set to copied state
    } catch (err) {
      console.error("Failed to copy text: ", err);
      fallbackCopyTextToClipboard(messageText);
      // You could add a user-facing toast/snackbar notification here
    }
  };

  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        justifyContent: align === "right" ? "flex-end" : "flex-start", // Push buttons to the left
        // Adjust internal padding based on alignment for visual balance
        paddingRight: align === "right" ? theme.spacing(0.5) : 0,
        paddingLeft: align === "right" ? 0 : theme.spacing(0.5),
        marginTop: theme.spacing(1), // Space between message text and actions
      }}
    >
      {/* Copy Button */}
      <Tooltip title={copied ? "Copied" : "Copy"}>
        <IconButton
          onClick={handleCopy}
          size="small"
          aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: "0.85rem" }, // Icon size
            color: theme.palette.text.secondary, // Default color
            "&:hover": {
              color: theme.palette.text.primary, // Slightly darker on hover
            },
            padding: theme.spacing(0.5), // Smaller padding for icon button itself
          }}
        >
          {copied ? (
            <CheckIcon />
          ) : (
            <ContentCopyIcon /> // Default copy icon
          )}
        </IconButton>
      </Tooltip>
      {/* Placeholder for future buttons, e.g.,
      <IconButton size="small">
          <MoreHorizIcon sx={{ fontSize: '1.25rem' }} />
      </IconButton>
      */}
    </Box>
  );
}

function ChatMessage({ message, onTypingComplete }) {
  const theme = useTheme();
  const isUser = message.sender === "user";

  // Internal state to manage typing completion for AI messages
  const [typingIsComplete, setTypingIsComplete] = useState(
    isUser || message.status === "completed",
  );
  const [isHovered, setIsHovered] = useState(false);
  const [shouldShowActions, setShouldShowActions] = useState(false);
  const hideActionsTimeoutRef = useRef(null);
  const HIDE_ACTIONS_DELAY_MS = 1_500; // Delay before hiding actions on mouse leave

  // If it's an AI message and typing is not complete, mark it as incomplete
  // This useEffect ensures that if the message is re-rendered (e.g., due to parent state change)
  // but it's an AI message that should still be typing, it resets the completion status.
  useEffect(() => {
    if (!isUser && message.status !== "completed") {
      setTypingIsComplete(false);
    }
  }, [message.text, isUser, message.status]); // Re-evaluate when message text or status changes

  // Effect to manage showing/hiding actions based on hover state and message type
  useEffect(() => {
    if (isUser) {
      // For user messages, show actions based on hover with a delay on hide
      if (isHovered) {
        clearTimeout(hideActionsTimeoutRef.current); // Clear any pending hide timeout
        setShouldShowActions(true); // Show immediately on hover in
      } else {
        // If not hovering, start a timeout to hide actions after a delay
        hideActionsTimeoutRef.current = setTimeout(() => {
          setShouldShowActions(false);
        }, HIDE_ACTIONS_DELAY_MS);
      }
    } else {
      // For AI messages, actions depend only on typing completion, no hover needed
      setShouldShowActions(typingIsComplete);
    }
    // Cleanup timeout on component unmount or before effect re-runs
    return () => {
      clearTimeout(hideActionsTimeoutRef.current);
    };
  }, [isHovered, isUser, typingIsComplete]);

  const handleTypingComplete = () => {
    setTypingIsComplete(true);
    if (onTypingComplete) {
      onTypingComplete(message.id); // Notify parent using message ID
    }
  };

  // Determine the content to display (typed or full text)
  const displayedContent =
    isUser || typingIsComplete ? (
      <Typography
        variant="body1"
        sx={{ fontSize: "inherit", whiteSpace: "pre-wrap" }}
      >
        {message.text}
      </Typography>
    ) : (
      <TypingEffect
        text={message.text}
        speed={30} // You can make this configurable
        onComplete={handleTypingComplete}
        variant="body1"
      />
    );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        textAlign: "left",
        marginBottom: theme.spacing(1.5), // Using spacing for consistency
        paddingX: {
          xs: theme.spacing(2),
          md: theme.spacing(3),
          lg: theme.spacing(4),
        }, // Responsive padding
        fontSize: "1.05rem", // Base font size for messages
      }}
    >
      {isUser ? (
        <Box
          onMouseEnter={() => setIsHovered(true)} // Set hovered state on mouse enters
          onMouseLeave={() => setIsHovered(false)} // Clear hovered state on mouse leaves
          sx={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            flexGrow: 1,
            maxWidth: "100%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            alignSelf: "flex-end",
          }}
        >
          {shouldShowActions && (
            <Fade in={shouldShowActions} timeout={{ enter: 500, exit: 1_000 }}>
              <Box
                sx={{
                  // This Box ensures the actions are always in the flow, even when hidden
                  // And takes care of the top margin between message content and actions
                  top: "-2rem", // Small space between message content and actions
                  visibility: shouldShowActions ? "visible" : "hidden", // Hide content but keep space
                  // Ensure it takes the full width required for alignment
                  width: "auto", // User actions can be auto width, AI actions need width for flex-start
                  alignSelf: "flex-end", // Align the action box itself,
                  position: "absolute",
                  zIndex: 1,
                }}
              >
                <MessageActions messageText={message.text} align={"right"} />
              </Box>
            </Fade>
          )}
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              padding: theme.spacing(1.25, 2), // Vertical and horizontal padding
              borderRadius: "1rem 1rem 0.25rem 1rem",
              maxWidth: { xs: "85%", sm: "75%", md: "60%", lg: "50%" }, // Responsive max-width
              wordBreak: "break-word",
              boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.05)",
              marginBottom: theme.spacing(1),
            }}
          >
            {displayedContent}
          </Box>
        </Box>
      ) : (
        // Styles for AI Plain Text Message
        <Box
          sx={{
            color: theme.palette.text.primary, // AI text color
            wordBreak: "break-word",
            flexGrow: 1, // Allow AI text to take up all available horizontal space
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%", // Ensure it doesn't overflow its container
            // No background, no special border-radius, no shadow for AI messages
            // The horizontal padding is handled by the parent Box (current component's outer Box)
            // The overall content width is controlled by ChatWindow's maxWidth
          }}
        >
          {displayedContent}
          {shouldShowActions && (
            <MessageActions messageText={message.text} align={"left"} />
          )}
        </Box>
      )}
    </Box>
  );
}

export default ChatMessage;
