import React, { useState, useEffect }  from 'react'
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomizedInput from './shared/CustomizedInput';
import { Box, Typography, Button } from '@mui/material'
import './Popup.css'
import { getAttendees } from '../helpers/api_communicator';
import NavigationLink from './shared/NavigationLink';
import { format } from "date-fns";

const ViewEvent = () => {

  const [attendees, setAttendees] = useState([]);

  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location)

  const prevEvent = location?.state.Event;


  useEffect(() => {
    if (!auth?.user) {
      return navigate("*");
    }
    else{
        loadAttendees();
    }
  }, [auth, navigate]);

  const loadAttendees = async () =>{
    try {
        const response = await getAttendees(`/attendees/${prevEvent.id}`);
        console.log(response);
        setAttendees(response);
      } catch (error) {
        console.error('Error loading events:', error);
      }
  }


  return (
    (
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={4}
      >
        <form >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
              color={'black'}
            >
            Event Details
            </Typography>
            <CustomizedInput type="name" name="name" label="Name" value={prevEvent.name}/>
            <CustomizedInput type="description" name="description" label="Description" value={prevEvent.description}/>
            <CustomizedInput type="place" name="place" label="Place" value={prevEvent.place}/>
            <CustomizedInput type="city" name="city" label="City" value={prevEvent.city}/>
            <CustomizedInput type="country" name="country" label="Country" value={prevEvent.country}/>
            <CustomizedInput type="date" name="date" label="Date" value={format(prevEvent.date, "yyyy-MM-dd")}/>

            <Typography
              variant="h5"
              textAlign="center"
              padding={2}
              fontWeight={600}
              color={'black'}
            >
            Attendee List 
            </Typography>
            <Box sx={{
              height: '400px', 
              overflowY: 'scroll',
              justifyContent: "center",
              marginBottom: ' 24px'
            }}>
                <div className='container'>
                    {
                        attendees.map((attendee, index)=>(
                            <div key={index+1} className='listel' style={{marginTop: '24px'}}>
                                <h4> {attendee.name}</h4>
                                {attendee.email}
                            </div>
                        ))
                    }
                </div>
            </Box>
            <NavigationLink
                bg="#6D5147"
                to="/dashboard"
                text="Back"
                textColor="black"
              />
          </Box>
        </form>
      </Box>
    )
  )
}

export default ViewEvent