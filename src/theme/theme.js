import { pink } from "@mui/material/colors";
import { createTheme } from "@mui/material";

/**
 * Calculate the spacing value in rem units based on the provided factor.
 *
 * @param {number} factor - The factor used to calculate the spacing value.
 * @return {string} The spacing value in rem units.
 */
export function spacing(factor) {
  return `${0.5 * factor}rem`;
}

// Base typography and spacing (using rem for relative sizing)
const baseThemeOptions = {
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 16, // Base font size, all rem units will be relative to this
    h1: { fontSize: "3rem" },
    h2: { fontSize: "2.5rem" },
    h3: { fontSize: "2rem" },
    h4: { fontSize: "1.5rem" },
    h5: { fontSize: "1.25rem" },
    h6: { fontSize: "1rem" },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
    button: { textTransform: "none" }, // Don't uppercase buttons
  },
  
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // No shadow by default
      },
      styleOverrides: {
        root: {
          borderRadius: "0.75rem", // Slightly rounded buttons
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "1.5rem", // More rounded input
            paddingRight: "0.5rem", // Space for icons
          },
          "& fieldset": {
            borderColor: "transparent", // Hide border
          },
          "&:hover fieldset": {
            borderColor: "transparent !important", // Hide border on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "transparent !important", // Hide border on focus
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "0.5rem", // Adjust padding for icon buttons
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none", // No shadow for header
        },
      },
    },
  },
};

export const darkTheme = {
  mode: "dark",
  primary: {
    main: "#8AB4F8",
  },
  secondary: {
    main: "#FECBDA",
  },
  error: {
    main: "#FA6161",
  },
  warning: {
    main: "#FFDF72",
  },
  info: {
    main: "#4DB1FF",
  },
  success: {
    main: "#BDE986",
  },
  background: {
    default: "#1E1F22",
    paper: "#2F3034",
  },
  text: {
    primary: "#EAECEE",
    secondary: "#8396A8",
    disabled: "#8396A8",
  },
  divider: "#2e3742",
};

export const lightTheme = {
  mode: "light",

  primary: {
    main: "#1A73E8",
  },

  secondary: {
    main: pink["500"],
  },

  error: {
    main: "#AA0808",
  },

  warning: {
    main: "#e76500",
  },

  info: {
    main: "#0070F2",
  },

  success: {
    main: "#256F3A",
  },

  text: {
    primary: "#1D2D3E",
    secondary: "#556B82",
    disabled: "#758ca4",
  },
};

export const getDesignTokens = (mode) => {
  return {
    ...baseThemeOptions,
    palette: mode === "dark" ? darkTheme : lightTheme,
  };
};

export function getTheme(mode) {
  return createTheme(getDesignTokens(mode));
}
