// src/components/ChatMessage.jsx
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import TypingEffect from "./TypingEffect.jsx";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { Tooltip } from "@mui/material";

function MessageActions({ messageText }) {
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
        display: "flex",
        justifyContent: "flex-start", // Push buttons to the left
        marginTop: theme.spacing(1), // Space between message text and actions
        paddingRight: theme.spacing(0.5), // Small internal padding for the buttons row
      }}
    >
      {/* Copy Button */}
      <Tooltip title={copied ? "Copied" : "Copy"}>
        <IconButton
          onClick={handleCopy}
          size="small"
          aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: "1.25rem" }, // Icon size
            color: theme.palette.text.secondary, // Default color
            "&:hover": {
              color: theme.palette.text.primary, // Slightly darker on hover
            },
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

  // If it's an AI message and typing is not complete, mark it as incomplete
  // This useEffect ensures that if the message is re-rendered (e.g., due to parent state change)
  // but it's an AI message that should still be typing, it resets the completion status.
  useEffect(() => {
    if (!isUser && message.status !== "completed") {
      setTypingIsComplete(false);
    }
  }, [message.text, isUser, message.status]); // Re-evaluate when message text or status changes

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
        justifyContent: isUser ? "flex-end" : "flex-start",
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
          sx={{
            backgroundColor: isUser
              ? theme.palette.background.paper
              : theme.palette.background.default,
            color: theme.palette.text.primary,
            padding: theme.spacing(1.25, 2), // Vertical and horizontal padding
            borderRadius: "1rem 1rem 0.25rem 1rem",
            maxWidth: { xs: "85%", sm: "75%", md: "60%", lg: "50%" }, // Responsive max-width
            wordBreak: "break-word",
            boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.05)",
            marginBottom: theme.spacing(2),
          }}
        >
          {displayedContent}
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
          {/* NEW: Copy button for AI messages, shown only after typing completes */}
          {typingIsComplete && <MessageActions messageText={message.text} />}
        </Box>
      )}
    </Box>
  );
}

export default ChatMessage;
