import React, { useState } from "react";
import Box from "@mui/material/Box";
import ChatWindow from "../../components/chat/ChatWindow.jsx";
import ChatInput from "../../components/chat/ChatInpunt.jsx";
import { v4 as uuid4 } from "uuid";

const MainView = (props) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const inputPlaceholder = "Ask anything";
  const initialGreeting = "What's on your mind today?";

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { text: input.trim(), sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      // Simulate AI response after a short delay
      setTimeout(() => {
        const aiResponse = {
          id: uuid4(),
          status: "typing",
          text: `Understood: "${userMessage.text}". This is where the game logic would come in!`,
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1_000);
    }
  };

  const handleAiTypingComplete = (messageId) => {
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
        flexDirection: "column",
        height: "100vh", // Full viewport height
        width: "100vw",
        backgroundColor: "background.default", // Use theme background color
        color: "text.primary", // Use theme text color
        overflow: "hidden", // Prevent body scrollbars
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
      />
    </Box>
  );
};

export default MainView;
