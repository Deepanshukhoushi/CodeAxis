import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [_jsx("h1", { className: "text-9xl font-bold text-primary-dark dark:text-primary-light", children: "404" }), _jsx("h2", { className: "text-3xl font-semibold text-gray-800 dark:text-gray-200 my-6", children: "Page Not Found" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400 max-w-md mb-8", children: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable." }), _jsx(Link, { to: "/", className: "px-6 py-3 bg-primary-dark hover:bg-primary text-white rounded-md transition-colors", children: "Return to Home" })] }));
};
export default NotFoundPage;
