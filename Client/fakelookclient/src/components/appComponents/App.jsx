import React from "react";
import Routes from "../../routing/Routes";
import Navigation from "../navigationComponents/navigation";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes />
    </div>
  );
}

export default App;
