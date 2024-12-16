import React, { useState } from "react";
import '../styles/Settings.css'
function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
     
      <div>
        <button onClick={toggleTheme}>
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
      <div class="settings-page">
  <h1 class="settings-title">Settings</h1>
  <div class="settings-container">
  
    <div class="setting-card">
      <h3 class="setting-title">Profile Settings</h3>
      <p class="setting-description">Manage your personal information.</p>
      <button class="setting-button">Edit</button>
    </div>
   
    <div class="setting-card">
      <h3 class="setting-title">Security Settings</h3>
      <p class="setting-description">Update passwords and enable 2FA.</p>
      <button class="setting-button">Manage</button>
    </div>
  
    <div class="setting-card">
      <h3 class="setting-title">Notification Settings</h3>
      <p class="setting-description">Customize your notifications.</p>
      <button class="setting-button">Configure</button>
    </div>
   
    <div class="setting-card">
      <h3 class="setting-title">Privacy Settings</h3>
      <p class="setting-description">Control who sees your data.</p>
      <button class="setting-button">Adjust</button>
    </div>
  </div>
</div>

    </div>
    
  );
}

export default SettingsPage;
