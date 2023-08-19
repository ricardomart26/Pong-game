import './App.css';
import { Routes, Route } from 'react-router-dom';
import GameMenu from './scenes/menu';
import Game from './scenes/game';
import LoginPage from './scenes/login';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="/menu" element={<GameMenu/>}></Route>

        {/* <Route path="/game" element={<Canvas/>}></Route> */}
        <Route path="/game">
          <Route path=":option" element={<Game/>}/>
          <Route path="me" element={<Game/>}/>
        </Route>

      </Routes>
      {/* <GameMenu/> */}
      {/* <Canvas/> */}
    </div>
  );
}

export default App;
