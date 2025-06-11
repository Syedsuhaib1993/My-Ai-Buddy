import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = ({isDark,setIsDark}) => {
  

  // On first load, sync with saved or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleDark = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDark}
      className="flex items-center gap-2 p-2 rounded-full border border-gray-400 dark:border-gray-600 transition hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {isDark ? (
         <>
          <Moon className="text-blue-500" size={20} />
          <span className="text-blue-500 text-sm">Dark</span>
        </>
      ) : (
        <>
          <Sun className="text-yellow-400" size={20} />
          <span className="text-yellow-400 text-sm">Light</span>
        </>
      )}
    </button>
  );
};

export default DarkModeToggle;
