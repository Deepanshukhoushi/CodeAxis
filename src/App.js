import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AnalyzerPage from './pages/AnalyzerPage';
import ResultsPage from './pages/ResultsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import './styles.css';
const App = () => {
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900", children: [_jsx(Header, {}), _jsx("main", { className: "flex-grow container mx-auto px-4 py-8", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/analyzer", element: _jsx(AnalyzerPage, {}) }), _jsx(Route, { path: "/results/:id", element: _jsx(ResultsPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }) }), _jsx(Footer, {})] }));
};
export default App;
