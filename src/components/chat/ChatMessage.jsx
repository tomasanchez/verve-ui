// src/components/ChatMessage.jsx
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import TypingEffect from "./TypingEffect.jsx";

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
            fontSize: "1rem",
            flexGrow: 1, // Allow AI text to take up all available horizontal space
            maxWidth: "100%", // Ensure it doesn't overflow its container
            // No background, no special border-radius, no shadow for AI messages
            // The horizontal padding is handled by the parent Box (current component's outer Box)
            // The overall content width is controlled by ChatWindow's maxWidth
          }}
        >
          {displayedContent}
        </Box>
      )}
    </Box>
  );
}

export default ChatMessage;
