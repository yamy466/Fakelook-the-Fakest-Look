import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../routing/Routes";
import "./App.css";
import History from "../../History/history";

function App() {
  return (
    <div className="App">
      <BrowserRouter history={History}>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
