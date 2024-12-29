//import React from 'react'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const getAuthToken = () => {
    return (
        window.localStorage.getItem('auth-token')
    )
};

export const setAuthHeader = (token) => {
    if(token!=null){
        window.localStorage.setItem("auth-token", token)
    }
    else{
        window.localStorage.removeItem('auth-token')
    }
};

export const checkAuthStatus = () =>{
    if(getAuthToken()!=null && getAuthToken() !=="null"  ){
        return {'message': 'ok'}
    }
    else return null;
}


export const request = (method, url, data) => {
  let headers ={};

  if(getAuthToken() !==null && getAuthToken() !=="null" ){
    headers = { 'Authorization' : `Bearer ${getAuthToken()}` };
  }

  console.log(method, url, data, headers)

  return (
    axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    })
  )
}
