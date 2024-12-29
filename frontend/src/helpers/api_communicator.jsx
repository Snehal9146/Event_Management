import axios from "axios";
import { request, setAuthHeader } from "./axios_helper";

export const addAttendee = async (eventid, name, email) => {
  console.log("reached api "+ name + " eventid: "+ eventid)
  const res = await request("POST","/addattendee", {eventid, name, email});
  if(res.status != 200)
  {
      throw new Error("Unable to register for event");
  }

  const data = await res.data;
  return data;
};

export const getAttendees = async (route) => {
  console.log("reached getattendees ")
  const res = await request("GET",route, {});
  if(res.status != 200)
  {
      throw new Error("Unable to get attendees");
  }

  const data = await res.data;
  return data;
};

export const addEvent = async (name, username, description, place, city, country, date) => {
  console.log("reached api "+ username + " date: "+ date)
  const res = await request("POST","/addevent", {name, username, description, place, city, country, date});
  if(res.status != 200)
  {
      throw new Error("Unable to add event");
  }

  const data = await res.data;
  return data;
};

export const updateEvent = async (route, name, username, description, place, city, country, date) => {
  console.log("reached api "+ username + " date: "+ date)
  const res = await request("PUT",route, {name, username, description, place, city, country, date});
  if(res.status != 200)
  {
      throw new Error("Unable to add event");
  }

  const data = await res.data;
  return data;
};


export const getEvents = async () => {
  console.log("reached getevents ")
  const res = await request("GET","/getevent", {});
  if(res.status != 200)
  {
      throw new Error("Unable to get events");
  }

  const data = await res.data;
  return data;
};

export const getAllEvents = async () => {
  console.log("reached getevents ")
  const res = await request("GET","/getallevents", {});
  if(res.status != 200)
  {
      throw new Error("Unable to get events");
  }

  const data = await res.data;
  return data;
};

export const loginUser = async (username, password) => {
    const res = await request("POST","/login", {username, password});
    if(res.status != 200)
    {
        setAuthHeader(null);
        throw new Error("Unable to login");
    }

    setAuthHeader(res.data.token)
    const data = await res.data;
    return data;
};

export const logoutUser = async () => {
    const res = await axios.get("/user/logout");
     //const res = "hi";
     if (res.status !== 200) {
       throw new Error("Unable to log out ");
     }
     setAuthHeader(null)
     const data = await res.data;
     //return "hiii , how can";
     return data;
};


export const signupUser = async (
    name,
    username,
    email,
    password
  ) => {
    console.log(username)

    const res = await request("POST", "/register", { name, username, email, password });
    if (res.status !== 201) {
      setAuthHeader(null);
      console.log("new error encountered")
      throw new Error("Unable to Signup");
    }

    setAuthHeader(res.data.token)
    const data = await res.data;
    return data;
};
  