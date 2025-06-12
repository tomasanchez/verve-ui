import React, { useState } from "react";
import Box from "@mui/material/Box";
import ChatWindow from "../../components/chat/ChatWindow.jsx";
import ChatInput from "../../components/chat/ChatInput.jsx";
import AppHeader from "../../components/header/AppHeader.jsx";
import { v4 as uuid4 } from "uuid";
import SceneInfoCard from "../../components/cards/SceneInfoCard.jsx";
import { mockCharacters, mockPlace } from "../../mocks/mockdata.js";
import { useTheme } from "@mui/material/styles";

const MainView = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const theme = useTheme();

  const inputPlaceholder = "Ask anything";
  const initialGreeting = "What's on your mind today?";

  const handleSendMessage = () => {
    if (input.trim() && !isTyping) {
      setIsTyping(true);
      const userMessage = { text: input.trim(), sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      // Simulate AI response after a short delay
      setTimeout(() => {
        const aiResponse = {
          id: uuid4(),
          status: "typing",
          text: `Understood:\n\n"${userMessage.text}".\n\nThis is where the game logic would come in!`,
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1_000);
    }
  };

  const handleAiTypingComplete = (messageId) => {
    setIsTyping(false);
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, status: "completed" } : msg,
      ),
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        // NEW: Change the flex direction based on screen size
        flexDirection: "column",
        height: "100vh", // Full viewport height
        width: "100vw",
        backgroundColor: "background.default", // Use theme background color
        color: "text.primary", // Use theme text color
        overflow: "hidden", // Prevent body scrollbars
      }}
    >
      <AppHeader />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1, // Takes all remaining vertical space
          flexDirection: { xs: "column", md: "row" }, // Row on md+, column on xs/sm
          gap: { xs: 0, md: theme.spacing(4) }, // Gap between chat and info card on md+
          justifyContent: "center", // Center content horizontally within this wrapper
          alignItems: "center", // NEW: Center items vertically (for SceneInfoCard)
          // Adjust top padding to space from AppHeader
          paddingTop: { xs: theme.spacing(1), md: theme.spacing(2) },
          paddingBottom: { xs: theme.spacing(1), md: theme.spacing(2) }, // Ensure space at bottom
          overflow: "hidden", // Important for contained scrolling within children
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1, // Takes up available space
            // NEW: Limit max width for the chat content and center it
            width: "100%",
            maxWidth: { xs: "100%", sm: "600px", md: "750px", lg: "900px" },
            margin: { xs: "0 auto", md: "0 auto" }, // Center chat pane horizontally
            height: "100%", // Fill height of parent
            boxSizing: "border-box",
          }}
        >
          <ChatWindow
            messages={messages}
            initialGreeting={messages.length === 0 ? initialGreeting : null}
            onTypingComplete={handleAiTypingComplete}
          />
          <ChatInput
            inputValue={input}
            onInputChange={(e) => setInput(e.target.value)}
            onSendMessage={handleSendMessage}
            placeholder={inputPlaceholder}
            disabled={isTyping}
          />
        </Box>
        <Box
          sx={{
            // NEW: Hide on xs/sm, display as flex on md and up
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end", // Align card to the right within its flex container
            paddingY: { xs: 0, md: theme.spacing(2), lg: theme.spacing(4) }, // Vertical padding to align with chat window
            // The SceneInfoCard itself has min/max width, so this wrapper doesn't need it
            height: "100%", // Take full height
            flexShrink: 0, // Prevent this pane from shrinking
            boxSizing: "border-box",
            margin: "0 auto",
          }}
        >
          <SceneInfoCard place={mockPlace} characters={mockCharacters} />
        </Box>
      </Box>
    </Box>
  );
};

export default MainView;
