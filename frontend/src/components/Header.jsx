import React from 'react'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavigationLink from './shared/NavigationLink';
import { getAuthContext } from '../context/AuthContext';


const Header = () => {

  const auth = getAuthContext();

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", flexDirection:"row" }}>
        <div>
        { auth?.isLoggedIn ? 
          (
            <>
            <NavigationLink bg="#6D5147"
            textColor="white"
            to="/"
            text="logout"
            onClick={auth.logout} />
            </>
          ) 
          : 
          (
            <>
            <div style={{display:'inline-flex'}}>
            <NavigationLink
                bg="#AE9D99"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#6D5147"
                textColor="white"
                to="/signup"
                text="Signup"
              />
              </div>
            </>) 
        }
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
