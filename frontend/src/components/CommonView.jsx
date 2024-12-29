import React, { useState, useEffect }  from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CustomizedInput from './shared/CustomizedInput';
import { Box, Typography, Button } from '@mui/material'
import './Popup.css'
import NavigationLink from './shared/NavigationLink';
import { format } from "date-fns";

const CommonViewEvent = () => {

  const location = useLocation();
  const navigate = useNavigate();

  console.log(location)


  const prevEvent = location?.state.Event;


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
            <NavigationLink
                bg="#6D5147"
                to="/allEvents"
                text="Back"
                textColor="black"
              />
          </Box>
        </form>
      </Box>
    )
  )
}

export default CommonViewEvent