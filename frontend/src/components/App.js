import React, { Component } from "react";
import ReactDOM from 'react-dom';
import HomePage from "./homepage"



export default function App() {
  
  return (
    <div>
      <HomePage />
    </div>
  );
}


// intializes react app by rendering app componenet inside of HTML element with ID app
const appDiv = document.getElementById("app");
ReactDOM.render(<App />, 
            
appDiv);


