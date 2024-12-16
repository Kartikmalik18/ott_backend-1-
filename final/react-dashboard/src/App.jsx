import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import LogInPage from "./components/LogInPage";               // Correct path
import RegistrationPage from "./components/RegistrationPage"; // Correct path
import DashboardPage from "./components/DashboardPage";       // Correct path
import AnalyticsPage from "./components/AnalyticsPage";       // Correct path
import SettingsPage from "./components/SettingsPage";         // Correct path
import './styles/style.css';        // Import global styles
import './styles/theme.css';         // Import dark/light mode styles
import './styles/Navbar.css';        // Import navbar styles
import './styles/Responsive.css';    // Import responsive styles
import './styles/Dashboard.css'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignUp = () => {
    // Optionally, handle sign-up logic or redirect to registration page.
  };

  return (
    <Router>
      <Routes>
        {/* The login page will be the default page */}
        <Route path="/" element={<LogInPage onLogin={handleLogin} />} />
        
        {/* The login page */}
        <Route path="/login" element={<LogInPage onLogin={handleLogin} />} />
        
        {/* Registration page */}
        <Route path="/register" element={<RegistrationPage />} />
        
        {/* Dashboard page (requires authentication) */}
        <Route path="/dashboard" element={ <DashboardPage /> } />
        
        {/* Analytics page */}
        <Route path="/analytics" element={<AnalyticsPage />} />
        
        {/* Settings page */}
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
