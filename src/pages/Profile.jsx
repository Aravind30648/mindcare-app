import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  });

  // Load saved details
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentDetails"));
    if (saved) setDetails(saved);
  }, []);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("studentDetails", JSON.stringify(details));
    alert("Details saved permanently!");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Student Profile</h1>
        <p>Manage your personal information</p>

        <div className="profile-form">
          <label>Name</label>
          <input type="text" name="name" value={details.name} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" value={details.email} onChange={handleChange} />

          <label>Phone</label>
          <input type="text" name="phone" value={details.phone} onChange={handleChange} />

          <label>Age</label>
          <input type="number" name="age" value={details.age} onChange={handleChange} />

          <label>Gender</label>
          <select name="gender" value={details.gender} onChange={handleChange}>
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <button className="save-btn" onClick={handleSave}>Save Details</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
