import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "../header/header";
import Routes from "../routing/Routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
