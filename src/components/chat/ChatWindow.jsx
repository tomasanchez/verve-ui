import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChatMessage from "./ChatMessage";
import { spacing } from "../../theme/theme.js";

function ChatWindow({ messages, initialGreeting, onTypingComplete }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      sx={{
        flexGrow: 1, // Takes up available space
        overflowY: "auto", // Enables scrolling
        paddingTop: spacing(3),
        paddingBottom: spacing(1),
        display: "flex",
        flexDirection: "column",
        // width: "100%",
        // maxWidth: { xs: "100%", sm: "600px", md: "750px", lg: "900px" },
        // margin: "0 auto",
        marginTop: spacing(1),
      }}
    >
      {messages.length === 0 && initialGreeting && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            textAlign: "center",
            paddingBottom: spacing(10), // Space from bottom for input
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "normal",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsive font size
              background:
                "linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {initialGreeting}
          </Typography>
        </Box>
      )}

      {messages.map((msg, index) => (
        <ChatMessage
          key={index}
          message={msg}
          onTypingComplete={onTypingComplete}
        />
      ))}
      <div
        id="last-message-scroll-target"
        ref={messagesEndRef}
        className="my-3"
      />
    </Box>
  );
}

export default ChatWindow;
