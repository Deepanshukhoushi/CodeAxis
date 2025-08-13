import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, []);
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const isActive = (path) => {
        return location.pathname === path;
    };
    return (_jsx("header", { className: "bg-white dark:bg-gray-800 shadow-sm", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "flex justify-between items-center py-4", children: [_jsx("div", { className: "flex items-center", children: _jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [_jsx("img", { src: "/public/favicon.svg", alt: "CodeAxis Logo", className: "h-8 w-8" }), _jsx("span", { className: "font-bold text-xl text-gray-900 dark:text-white", children: "CodeAxis" })] }) }), _jsxs("nav", { className: "hidden md:flex space-x-8", children: [_jsx(Link, { to: "/", className: `${isActive('/') ? 'text-primary-dark dark:text-primary-light font-medium' : 'text-gray-600 dark:text-gray-300'} hover:text-primary-dark dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium`, children: "Home" }), _jsx(Link, { to: "/analyzer", className: `${isActive('/analyzer') ? 'text-primary-dark dark:text-primary-light font-medium' : 'text-gray-600 dark:text-gray-300'} hover:text-primary-dark dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium`, children: "Analyzer" }), _jsx(Link, { to: "/profile", className: `${isActive('/profile') ? 'text-primary-dark dark:text-primary-light font-medium' : 'text-gray-600 dark:text-gray-300'} hover:text-primary-dark dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium`, children: "Profile" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("button", { onClick: toggleDarkMode, className: "p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary-light focus:outline-none", "aria-label": "Toggle dark mode", children: darkMode ? (_jsx(SunIcon, { className: "h-6 w-6" })) : (_jsx(MoonIcon, { className: "h-6 w-6" })) }), _jsx("button", { onClick: toggleMenu, className: "md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary-dark dark:hover:text-primary-light focus:outline-none", children: _jsx("svg", { className: "h-6 w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: isMenuOpen ? (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })) : (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" })) }) })] })] }), isMenuOpen && (_jsx("div", { className: "md:hidden pb-4", children: _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx(Link, { to: "/", onClick: () => setIsMenuOpen(false), className: `${isActive('/') ? 'bg-gray-100 dark:bg-gray-700 text-primary-dark dark:text-primary-light' : 'text-gray-600 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium`, children: "Home" }), _jsx(Link, { to: "/analyzer", onClick: () => setIsMenuOpen(false), className: `${isActive('/analyzer') ? 'bg-gray-100 dark:bg-gray-700 text-primary-dark dark:text-primary-light' : 'text-gray-600 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium`, children: "Analyzer" }), _jsx(Link, { to: "/profile", onClick: () => setIsMenuOpen(false), className: `${isActive('/profile') ? 'bg-gray-100 dark:bg-gray-700 text-primary-dark dark:text-primary-light' : 'text-gray-600 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium`, children: "Profile" })] }) }))] }) }));
};
export default Header;
