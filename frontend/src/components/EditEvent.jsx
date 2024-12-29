import React, { useState, useEffect }  from 'react'
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomizedInput from './shared/CustomizedInput';
import { Box, Typography, Button } from '@mui/material'
import './Popup.css'
import { updateEvent } from '../helpers/api_communicator';
import NavigationLink from './shared/NavigationLink';
import { format } from "date-fns";

const EditEvent = () => {

  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location)

  useEffect(() => {
    if (!auth?.user) {
      return navigate("*");
    }
  }, [auth, navigate]);

  const [prevEvent, setPrevEvent] = useState(location?.state.Event);

  const onInputChange = (e) => {
    setPrevEvent({ ...prevEvent, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e)=>{

    e.preventDefault();
    const data = new FormData(e.currentTarget)

    const name = data.get("name"); //we get by name
    const description = data.get("description");
    const place = data.get("place");
    const city = data.get("city");
    const country = data.get("country");
    const date = data.get("date");
    const username = auth.user.username;


    try {
      const response = await updateEvent(`/update/${prevEvent.id}` ,name, username, description, place, city, country, date);
      console.log(response)

      toast.loading("Event Updated Successfuly");
      setTimeout(() => {
        toast.dismiss();
      }, 3000);

      

    } catch (error) {
      console.log(error);
      toast.loading("Event couldn't be added");
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }

    //props.setTrigger(false)
    console.log(username + " and " + name);
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
        <form onSubmit={handleSubmit} >
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
            Edit Event
            </Typography>
            <CustomizedInput type="name" name="name" label="Name" value={prevEvent.name} onChange={(e) => onInputChange(e)}/>
            <CustomizedInput type="description" name="description" label="Description" value={prevEvent.description} onChange={(e) => onInputChange(e)}/>
            <CustomizedInput type="place" name="place" label="Place" value={prevEvent.place} onChange={(e) => onInputChange(e)}/>
            <CustomizedInput type="city" name="city" label="City" value={prevEvent.city} onChange={(e) => onInputChange(e)}/>
            <CustomizedInput type="country" name="country" label="Country" value={prevEvent.country} onChange={(e) => onInputChange(e)}/>
            <CustomizedInput type="date" name="date" label="Date" value={format(prevEvent.date, "yyyy-MM-dd")} onChange={(e) => onInputChange(e)}/>
          
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#AE9D99",
                color: "black",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
                marginBottom:'24px'
              }}
              
            >
              Update
            </Button>

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

export default EditEvent