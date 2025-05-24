import React from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Predict from "./components/Predict";
import Portfolio from "./components/Portfolio";
import Charts from "./components/Charts";
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/predict" element={<Predict/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/charts" element={<Charts/>}/>
      </Routes>
    </div>
  );
};

export default App;
