import React, { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import CustomizedInput from './shared/CustomizedInput'
import {toast } from 'react-hot-toast';
import { useLocation, useNavigate} from 'react-router-dom';
import { addAttendee } from '../helpers/api_communicator';
import NavigationLink from './shared/NavigationLink';


const AttendeeRegister = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const prevEvent = location?.state.Event;

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const name = data.get("name"); //we get by name
    const email = data.get("email");

    try {
      toast.loading("Registering");
      
      const response = await addAttendee(prevEvent.id ,name, email);
      console.log(response)

      toast.loading("Registered Successfuly");
      setTimeout(() => {
        toast.dismiss();
      }, 3000);

    } catch (error) {
      console.log(error);
      toast.loading("Failed to register");
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }

    console.log(name + " and " + email);

    navigate("/allEvents");
  }

  return (
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
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
            Register
            </Typography>
            <CustomizedInput type="name" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
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
                marginBottom:"24px"
              }} 
            >
              Register For Event
            </Button>
            <NavigationLink
                bg="#6D5147"
                to="/"
                text="Back To Home"
                textColor="black"
              />
          </Box>
        </form>
      </Box>
  )
}

export default AttendeeRegister
