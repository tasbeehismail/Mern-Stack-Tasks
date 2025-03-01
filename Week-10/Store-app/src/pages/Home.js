import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Welcome to Our Store</h1>
      <p>Discover the latest trends and shop your favorite products.</p>
      <button className="nav-button" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
};

export default Home;