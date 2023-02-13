import './App.css';
import User from './components/User';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import PrivateRoutes from './components/PrivateRoutes';
// import Contact from './components/Contact';
// import Movie from './components/Movie';
// import Header from './components/Header';
// import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  // window.auth = true

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route element={<PrivateRoutes/>}>
          <Route path="/User/:username" element={<User/>}/>
          <Route path="/Home/:username" element={<Home/>}/>
        </Route>
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;


