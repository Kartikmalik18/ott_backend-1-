import React, { useState } from 'react';
import '../styles/AnalyticsPage.css';

const AnalyticsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email) {
      setData([...data, { name, email }]);
      setName('');
      setEmail('');
    }
  };

  // Function to export data to CSV
  const exportToCSV = () => {
    const csvRows = [];
    // Add header row
    csvRows.push(['Name', 'Email']);

    // Add data rows
    data.forEach((item) => {
      csvRows.push([item.name, item.email]);
    });

    // Create CSV string
    const csvString = csvRows.map((row) => row.join(',')).join('\n');

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv'; // Default CSV file name
    a.click();
    URL.revokeObjectURL(url); // Cleanup the URL
  };

  return (
    <div className="analytics-page">
      <h2>Enter Data for Analytics</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="data-form">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {/* Data List Section */}
      <h3>Data List</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export Button */}
      <button onClick={exportToCSV} className="export-button">Export to CSV</button>
    </div>
  );
};

export default AnalyticsPage;
