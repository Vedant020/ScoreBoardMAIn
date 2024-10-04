import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ControllerBasic } from './components/kabaddi-controller';
import { WORK } from './components/kabaddi-scoreboard';


function App() {
  return (
    <div>
      <Routes>
        {/* Route for displaying the score */}
        <Route path="/" element={<WORK />} />

        {/* Route for controlling the score */}
        <Route path="/controller" element={<ControllerBasic />} />
      </Routes>
    </div>
  );
}

export default App;
