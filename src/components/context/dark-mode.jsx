import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const ThemeContext = createContext({
   darkMode: false,
   toggleTheme: () => undefined,
});

export function ThemeProvider({ children }) {
   const [darkMode, setDarkMode] = useState(
       localStorage.getItem("theme") === "dark"
   );

   useEffect(() => {
       document.body.classList.toggle("dark-theme", darkMode);
       localStorage.setItem("theme", darkMode ? "dark" : "light");
   }, [darkMode]);
   const toggleTheme = () => {
       console.log("toggle");
       setDarkMode((prev) => !prev);
   };

   return (
       <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
           {children}
       </ThemeContext.Provider>
   );
}

ThemeProvider.propTypes = {
   children: PropTypes.node.isRequired,
 };

export function useTheme() {
   return useContext(ThemeContext);
}

