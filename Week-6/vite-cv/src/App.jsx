import React from 'react';
import './index.css'; // Import global styles
import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Photo from './components/Photo';

function App() {
  return (
    <div className="cv-container">
      <Header />
      <div className="cv-content">
        <div className="cv-left">
          <AboutMe />
          <Education />
          <Experience />
        </div>
        <div className="cv-right">
          <Photo />
          <Contact />
          <Skills />
        </div>
      </div>
    </div>
  );
}

export default App;
