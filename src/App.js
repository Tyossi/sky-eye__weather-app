import React from "react";
import SearchBar from "./components/SearchBar/SearchBar"
import keys from "./components/keys";
import axios from "axios"
import './App.css';
import "./dist/wu-icons-style.css";
import Weather from "./components/Weather/Weather";
import mountain from "./Images/mountain.jpg"

const App = () => {
  
  return (
    <div>
        <Weather/>
    </div>
  
                
  );
}

export default App;
