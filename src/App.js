import './App.css';
import User from './components/User';
import Login from './components/Login';
import Home from './components/Home';
// import Contact from './components/Contact';
import Movie from './components/Movie';
import Header from './components/Header';
// import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/User/:username" element={<User/>}/>
        <Route path="/Home/:username" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;


