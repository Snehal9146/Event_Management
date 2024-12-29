import React, { useState, useEffect } from 'react'
import { useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, request } from '../helpers/axios_helper';
import { Button } from '@mui/material';
import AddEvent from './AddEvent';
import { getEvents } from '../helpers/api_communicator';
import NavigationLink from './shared/NavigationLink';
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";


const Dashboard = () => {
  const [addButtonPopup, setAddButtonPopup] = useState(false);
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();
  const auth = useAuth();

  console.log(getAuthToken());

  useEffect(() => {
    if (!auth?.user) {
      return navigate("*");
    }
    else{
      loadEvents();
    }
  }, [auth, navigate]);

  const loadEvents = async () =>{
    try {
      const response = await getEvents();
      const events = response.map(event => ({
        ...event,
        date: new Date(event.date) // Assuming eventDate is the field with the timestamp
      }));
      console.log(events);
      setEvents(events);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }

  const onDelete = async (id) =>{
    await request("DELETE", `/delete/${id}`, {})
    loadEvents();
  }


  return (
    <div>
      <h1 style={{color: 'black', marginBottom:'24px'}}>Dashboard </h1>
      <NavigationLink
                bg="#AE9D99"
                to="/addEvent"
                text="Add Event"
                textColor="black"
              />
        <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">City</th>
              <th scope="col">Country</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <th scope="row">
                  {index + 1}
                </th>
                <td>{event.name}</td>
                <td>{event.city}</td>
                <td>{event.country}</td>
                <td>{format(event.date, "MMMM do, yyyy")}</td>
                <td>
                  <Link
                    className="btn mx-2 btn-secondary btn-outline-light"
                    to={{
                      pathname: "/viewEvent",
                    }}
                    state={{Event: event}}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2 btn-outline-dark"
                    to={{
                        pathname: "/editEvent",
                    }}
                    state={{Event: event}}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={ ()=> onDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        
        </table>
      </div>
    </div>

    </div>
  )
}

export default Dashboard

// onClick={()=> setAddButtonPopup(true)}  
// <AddEvent trigger={addButtonPopup} setTrigger={setAddButtonPopup}></AddEvent>
