import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

function TypingEffect({ text, speed = 30, onComplete, variant = "body1" }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout); // Clean up timeout on unmount or re-render
    } else {
      if (onComplete) {
        onComplete(); // Notify parent that typing is complete
      }
    }
  }, [currentIndex, text, speed, onComplete]);

  // If the text changes (e.g., a new message comes in), reset the effect
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <Typography variant={variant} sx={{ fontSize: "inherit" }}>
      {displayedText}
    </Typography>
  );
}

export default TypingEffect;
