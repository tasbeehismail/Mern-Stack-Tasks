import React, { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    city: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleFocus = (e) => {
    e.target.style.border = "solid 1px #6a1b9a"; 
  };

  const handleBlur = (e) => {
    e.target.style.border = "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      setErrors({});
      console.log("Form Data:", formData); 
      navigate("/products"); 
    } catch (error) {
      const validationErrors = {};
      error.errors.forEach((err) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <div className="registration-form">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div>
            <label>City:</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
            <option value="">Select City</option>
            <option value="Cairo">Cairo</option> {/* Egypt */}
            <option value="Alexandria">Alexandria</option> {/* Egypt */}
            <option value="Riyadh">Riyadh</option> {/* Saudi Arabia */}
            <option value="Jeddah">Jeddah</option> {/* Saudi Arabia */}
            <option value="Dubai">Dubai</option> {/* UAE */}
            <option value="Abu Dhabi">Abu Dhabi</option> {/* UAE */}
            <option value="Amman">Amman</option> {/* Jordan */}
            <option value="Beirut">Beirut</option> {/* Lebanon */}
            <option value="Casablanca">Casablanca</option> {/* Morocco */}
            <option value="Rabat">Rabat</option> {/* Morocco */}
            <option value="Tunis">Tunis</option> {/* Tunisia */}
            <option value="Khartoum">Khartoum</option> {/* Sudan */}
            <option value="Sana'a">Sana'a</option> {/* Yemen */}
            <option value="Baghdad">Baghdad</option> {/* Iraq */}
            <option value="Erbil">Erbil</option> {/* Iraq */}
            <option value="Tripoli">Tripoli</option> {/* Libya */}
            <option value="Muscat">Muscat</option> {/* Oman */}
            <option value="Doha">Doha</option> {/* Qatar */}
            <option value="Manama">Manama</option> {/* Bahrain */}
            <option value="Kuwait City">Kuwait City</option> {/* Kuwait */}
            <option value="Ramallah">Ramallah</option> {/* Palestine */}
            <option value="Gaza">Gaza</option> {/* Palestine */}
            </select>
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;