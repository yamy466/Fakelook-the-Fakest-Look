import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../../routing/routes";
import Navigation from "../navigationComponents/navigation";
import "./App.css";
import History from "../../History/history";

function App() {
  return (
    <div className="App">
      <BrowserRouter history={History}>
        <Navigation />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
