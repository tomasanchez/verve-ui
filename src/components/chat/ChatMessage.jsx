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
  // Initialize based on message.isTyping (if provided) or default to false for new AI messages
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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        width: "100%",
        marginBottom: theme.spacing(1.5), // Using spacing for consistency
        paddingX: { xs: theme.spacing(1), md: theme.spacing(2) }, // Responsive padding
      }}
    >
      <Box
        sx={{
          backgroundColor: isUser
            ? theme.palette.background.paper
            : theme.palette.background.default,
          color: theme.palette.text.primary,
          padding: theme.spacing(1.25, 2), // Vertical and horizontal padding
          borderRadius: isUser
            ? "1rem 1rem 0.25rem 1rem"
            : "1rem 1rem 1rem 0.25rem", // Rounded corners
          maxWidth: { xs: "85%", sm: "75%", md: "60%" }, // Responsive max-width
          wordBreak: "break-word",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          fontSize: "1rem", // Base font size for messages
          textAlign: "left",
        }}
      >
        {isUser || typingIsComplete ? (
          // If it's a user message or AI typing is complete, render directly
          <Typography variant="body1" sx={{ fontSize: "inherit" }}>
            {message.text}
          </Typography>
        ) : (
          // If it's an AI message and typing is not complete, use TypingEffect
          <TypingEffect
            text={message.text}
            speed={30} // You can make this configurable if needed
            onComplete={handleTypingComplete}
            variant="body1"
          />
        )}
      </Box>
    </Box>
  );
}

export default ChatMessage;
