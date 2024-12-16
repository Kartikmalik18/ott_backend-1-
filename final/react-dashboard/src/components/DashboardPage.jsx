import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and redirect to login page
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    
    <div className="dashboard-container">
      {/* Header Section */}
      <header>
        <nav className="navbar pad2">
          <button onClick={() => navigate("/dashboard")}>Overview</button>
          <button onClick={() => navigate("/analytics")}>Analytics</button>
          <button onClick={() => navigate("/settings")}>Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      {/* Main Dashboard Content */}
      <div className="flex1 card-container">
      <div className="cont">
      <div className="pad">
        {/* Profile Section */}
        <div className="dashboard left">
          <div className="profile">
            <img
              src="./Profile.jpeg"
              alt="Profile of Kartik Malik"
              className="profile-image profile-picture"
            />
            <br />
            <h2>Kartik Malik</h2>
            <br />
            <p className="col">Full Stack Developer</p>
            <br />
            </div>
            <div className="ratings">
              <p>
                Overall Rating - <span className="aqua">8.2</span>
              </p>
              <p>
                Completed Projects - <span className="cp">78%</span>
              </p>
              <p>Proficient Skills - 10</p>
            
          </div>
        </div>

        {/* Deadline Section */}
        <div className="deadlines">
          <div className="section">
            <h2 className="title">Deadlines</h2>
            <div className="flex">
              <h3>AI/ML</h3>
              <h3>UI/UX</h3>
            </div>
            <div className="flex">
              <span className="time notice">4 Days left</span>
              <span className="time notice">2 Days left</span>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="deadlines">
        <div className="skills-section deadlines">
          <div className="skillset">
            <h2 className=" title">Skillset</h2>
            <ul className="skills-list">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React.js</li>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>MongoDB</li>
              <li>C</li>
              <li>C++</li>
              <li>Basics of Machine Learning</li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
   
   <div className="flex1 pad3">
    <div class="certification-card">
  <h2 class="cert-title">Certifications</h2>
  <div class="cert-item">
    <h3 class="cert-name">Full Stack Development</h3>
    <p class="cert-issuer">Issued by: Coursera</p>
    <p class="cert-expertise">Expertise Level: Advanced</p>
  </div>
  <div class="cert-item">
    <h3 class="cert-name">Machine Learning Basics</h3>
    <p class="cert-issuer">Issued by: Stanford Online</p>
    <p class="cert-expertise">Expertise Level: Intermediate</p>
  </div>
  <div class="cert-item">
    <h3 class="cert-name">UI/UX Design Fundamentals</h3>
    <p class="cert-issuer">Issued by: Udemy</p>
    <p class="cert-expertise">Expertise Level: Beginner</p>
  </div>
</div>

    </div>
    <div class="skills-card">
  <h2 class="skills-title colo">Most Wanted Skills</h2>
  <ul class="skills-list">
    <li class="skill-item">Artificial Intelligence</li>
    <li class="skill-item">Cloud Computing</li>
    <li class="skill-item">Cybersecurity</li>
    <li class="skill-item">Data Analytics</li>
    <li class="skill-item">Blockchain</li>
    <li class="skill-item">DevOps</li>
    <li class="skill-item">React.js</li>
    <li class="skill-item">Python Programming</li>
  </ul>
</div>
<img src="" alt="" />
</div>
    </div>
    
  
  );
}
export default DashboardPage;
