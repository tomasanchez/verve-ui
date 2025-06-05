import "./App.css";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { getTheme } from "./theme/theme.js";
import MainView from "./views/main/MainView.jsx";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  document.body.classList.remove("bg-light", "bg-dark");
  document.body.classList.add(prefersDarkMode ? "bg-light" : "bg-dark");

  return (
    <ThemeProvider theme={getTheme(prefersDarkMode ? "dark" : "light")}>
      <CssBaseline />
      <MainView />
    </ThemeProvider>
  );
}

export default App;
