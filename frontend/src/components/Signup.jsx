import React, { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import CustomizedInput from './shared/CustomizedInput'
import {toast } from 'react-hot-toast';
import {useAuth} from '../context/AuthContext';
import { useNavigate} from 'react-router-dom';
import NavigationLink from './shared/NavigationLink';


const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e)=>{

    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const email = data.get("email"); //we get by name
    const password = data.get("password");
    const name = data.get("name");
    const username = data.get("username");

    try {
      toast.loading("Signing In", {id:"login"});
      await auth?.signup(name, username, email , password);
      toast.loading("Signed up Successfuly", {id:"signup"});
      setTimeout(() => {
        toast.dismiss();
      }, 3000);

    } catch (error) {
      console.log(error);
      toast.loading("Signing up Failed", {id:"signup"});
      setTimeout(() => {
        toast.dismiss();
      }, 3000);

    }

    console.log(username + " and " + password);
  }


    useEffect(()=>{
      if(auth?.user)
        {
          toast.success("dashboard");
          return navigate("/dashboard");
        }

    },[auth]);


  return (
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={6}
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
              Signup
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="username" name="username" label="Username" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
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
              Signup
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

export default Signup
