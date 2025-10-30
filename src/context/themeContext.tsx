/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useMemo, useState } from "react";

// contextAPI - for global data management
// ThemeContext - for implementing dark/light theme across the app
// Context Provider - stores and manipulates context data
// Context Consumer - useContext() hook to use the context value

type Theme = "light" | "dark";

interface ThemeContextValues {
  theme: Theme;
  toggleTheme: ()=> void;
}

const ThemeContext = createContext<ThemeContextValues>({
  theme: "light",
  toggleTheme: ()=> {},
});

const ThemeProvider = ({ children }: { children: React.ReactElement }) => {
  const [theme, setTheme] = useState<Theme>("light");
  
  const toggleTheme =()=>{
    setTheme((prevTheme) => (prevTheme === "light"? "dark":"light"))
  }

  const value = useMemo(()=> ({theme, toggleTheme}), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook that comsumes ThemContext and returns context values
const useTheme = ()=> {
    const context = useContext(ThemeContext);
    return context;
}

export { useTheme, ThemeProvider};