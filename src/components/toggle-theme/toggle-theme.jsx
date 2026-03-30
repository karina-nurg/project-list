import { useTheme } from '../context/dark-mode'
const ThemeToggle = () => {
 const { darkMode, toggleTheme } = useTheme()

 return (
   <button className="theme-btn" onClick={toggleTheme}>
     {darkMode ? <img src="/sun.svg" alt="sun" width="20"/> : <img src="/moon.svg" alt="moon" width="20"/>}
   </button>
 )
}

export default ThemeToggle
