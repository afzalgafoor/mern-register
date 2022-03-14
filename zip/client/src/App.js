import './App.css'
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Homepage from './components/Homepage/Homepage.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, Fragment } from 'react';
import Admin from './components/Admin/Admin';
import Main from './components/Main/Main';

function App() {

  const [user, setLoginUser] = useState({})
  return (
    <div className="App">
      <Navbar />
      {/* <div className='main' style={{ backgroundcolor: "cyan" }}><Main /></div> */}

      <Router>

        <Routes>
          <Fragment>
            <Route exact path="/" element={user && user._id ? <Main setLoginUser={setLoginUser} /> : <Homepage setLoginUser={setLoginUser} />} />
            {/* <Route exact path="/" element={user && user._id ? <Homepage /> : <Main />} /> */}
            {/* <Route exact path="/" element={!localStorage.getItem("existingUser") ? <Main /> : <Homepage />} /> */}
            <Route exact path='/login' element={<Login setLoginUser={setLoginUser} />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/admin' element={<Admin />} />
            <Route exact path='/home' element={<Homepage />} />
            <Route exact path='/main' element={<Main />} />

          </Fragment>
        </Routes>
        {/* <Admin /> */}

      </Router>
    </div>
  );
}

export default App;
