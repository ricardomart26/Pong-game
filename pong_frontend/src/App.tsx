import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Canvas from './components/Canvas';
import GameMenu from './scenes/menu';


function App() {

 


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GameMenu/>}></Route>
        {/* <Route path="/game" element={<Canvas/>}></Route> */}
        <Route path="/game">
          <Route path=":option" element={<Canvas/>}/>
          <Route path="me" element={<Canvas/>}/>
        </Route>
      </Routes>
      {/* <GameMenu/> */}
      {/* <Canvas/> */}
    </div>
  );
}

export default App;
