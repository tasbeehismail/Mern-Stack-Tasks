import React from 'react';
import '../styles/photo.css';
import profileImage from '/profile.jpg'

function Photo() {
    return (
      <div className="photo">
        <img src={profileImage} alt="Profile" />
      </div>
    );
  }

export default Photo;
