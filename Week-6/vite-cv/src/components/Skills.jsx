import React from 'react';
import '../styles/skills.css';

function Skills() {
  return (
    <section className="skills">
      <h3>Skills</h3>
      <ul>
        <li>
          Problem Solving
          <div className="skill-bar">
            <div className="skill-bar-fill problem-solving"></div>
          </div>
        </li>
        <li>
          Backend Development
          <div className="skill-bar">
            <div className="skill-bar-fill backend-development"></div>
          </div>
        </li>
        <li>
          Competitive Programming
          <div className="skill-bar">
            <div className="skill-bar-fill competitive-programming"></div>
          </div>
        </li>
        <li>
          Data Structures
          <div className="skill-bar">
            <div className="skill-bar-fill data-structures"></div>
          </div>
        </li>
        <li>
          Algorithms
          <div className="skill-bar">
            <div className="skill-bar-fill algorithms"></div>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default Skills;
