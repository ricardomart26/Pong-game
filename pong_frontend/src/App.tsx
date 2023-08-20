import './App.css';
import { Routes, Route } from 'react-router-dom';
import GameMenu from './scenes/menu';
import Game from './scenes/game';
import LoginPage from './scenes/login';
import SignupPage from './scenes/signup';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignupPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/menu" element={<GameMenu/>}></Route>

        {/* <Route path="/game" element={<Canvas/>}></Route> */}
        <Route path="/game">
          <Route path=":option" element={<Game/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
