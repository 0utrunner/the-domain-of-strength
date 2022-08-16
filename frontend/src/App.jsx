import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Intro from './components/Intro'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './components/Home'
import axios from './api/axios'
import History from './components/History'
import Record from './components/Record'
import Edit from './components/Edit'


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common['X-CSRFToken'] = csrftoken

function App() {

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Intro />}></Route>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Logout' element={<Logout />}></Route>
          <Route path='/Home' element={<Home />}></Route>
          <Route path='/History'element={<History />}></Route>
          <Route path='/Record'element={<Record />}></Route>
          <Route path='/Edit/:workoutID'element={<Edit />}></Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App