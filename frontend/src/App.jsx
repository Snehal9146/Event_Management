//import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard'
import { Home } from './components/Home'
import { Route, Routes } from "react-router-dom";
//import { AuthProvider, useAuth } from "./context/AuthContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header'
import AddEvent from './components/AddEvent'
import EditEvent from './components/EditEvent'
import ViewEvent from './components/ViewEvent'
import CommonEvents from './components/CommonEvents'
import CommonViewEvent from './components/CommonView'
import AttendeeRegister from './components/RegisterUser'


function App() {

  console.log("ok")

  return (
    //<div className="App">
    <main>
      <Header></Header>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/allEvents" element={<CommonEvents/>} />
        <Route path="/viewCommonEvent" element={<CommonViewEvent/>} />
        <Route path="/registerAttendee" element={<AttendeeRegister/>} />

        <Route path="*" element={<NotFound/>}/>
        <Route path="/dashboard/" element={<Dashboard/>} />
        <Route path="/addEvent" element={<AddEvent/>} />
        <Route path="/editEvent" element={<EditEvent/>} />
        <Route path="/viewEvent" element={<ViewEvent/>} />

        
      </Routes>
    </main>
   // </div>
  )
}

export default App
