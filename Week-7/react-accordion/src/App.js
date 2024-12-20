import React from "react";
import Accordion from "./components/Accordion";
import "./App.css"; 

function App() {
  return (
    <div className="app">
      <h1>React Accordion</h1>
      <Accordion
        title="What is Problem solving?"
        content="Problem solving is the process of determining the best possible action to take in a given situation."
      />
      <Accordion
        title="What is Competitive programming?"
        content="Competitive programming is a mind sport involving participants trying to program according to provided specifications. The contests are usually held over the Internet or a local network."
      />
      <Accordion
        title="What is a ICPC?"
        content="Team competition for university students, the contest consists of many regional rounds that conclude in a world final organized yearly. Teams consist of three students from the same university and they are allowed to use only one computer."
      />
    </div>
  );
}

export default App;
