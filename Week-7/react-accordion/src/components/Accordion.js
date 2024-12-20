import React, { useState } from "react";
import "./Accordion.css"; 

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-container">
      <div className="accordion-header" onClick={toggleAccordion}>
        {title}
        <span className="accordion-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && <div className="accordion-body">{content}</div>}
    </div>
  );
}

export default Accordion;
