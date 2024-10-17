import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Initial state with default theme
const initialState = {
  theme: "system",
  setTheme: () => null,
};

// Create the ThemeProviderContext
const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({ children, defaultTheme = "dark", storageKey = "homepage-theme", ...props }) {
  const location = useLocation(); // Get the current location
  const [theme, setThemeState] = useState(() => {
    // Reset theme if not on homepage
    if (location.pathname !== "/") {
      return "light"; // Set default theme when not on homepage
    }
    return localStorage.getItem(storageKey) || defaultTheme; // Otherwise, use stored theme
  });

  // Effect to handle applying the correct theme class to the document element
  useEffect(() => {
    const root = window.document.documentElement; // Get the root HTML element

    // Remove existing theme classes
    root.classList.remove("light", "dark");

    // Apply system theme if selected
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    // Apply selected theme (either light or dark)
    root.classList.add(theme);
  }, [theme]);

  // Effect to reset theme when navigating away from homepage
  useEffect(() => {
    if (location.pathname !== "/") {
      setThemeState("light"); // Reset to light theme on other pages
      localStorage.setItem(storageKey, "light"); // Update localStorage to match
    }
  }, [location.pathname]);

  // Function to update the theme and store it in localStorage
  const setTheme = (newTheme) => {
    localStorage.setItem(storageKey, newTheme); // Store the new theme in localStorage
    setThemeState(newTheme); // Update the state with the new theme
  };

  // Context value to be shared across the app
  const value = { theme, setTheme };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Hook to use the theme in any component
export const useTheme = () => {
  const context = useContext(ThemeProviderContext); // Access the context

  // If the context is not found, throw an error (ensures proper usage)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context; // Return the theme and setTheme function
};
