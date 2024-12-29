import React, { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import CustomizedInput from './shared/CustomizedInput'
import {toast } from 'react-hot-toast';
import {useAuth} from '../context/AuthContext';
import { useNavigate} from 'react-router-dom';
import NavigationLink from './shared/NavigationLink';


const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const username = data.get("username"); //we get by name
    const password = data.get("password");

    try {
      toast.loading("Signing In", {id:"login"});
      await auth?.login(username, password);
      toast.loading("Signed In Successfuly", {id:"login"});
      setTimeout(() => {
        toast.dismiss();
      }, 3000);

    } catch (error) {
      console.log(error);
      toast.loading("Signing In Failed", {id:"login"});
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }

    console.log(username + " and " + password);
  }
    useEffect(()=>{
      if(auth?.user)
        {
          return navigate("/dashboard/");
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
        mt={10}
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
            Login
            </Typography>
            <CustomizedInput type="username" name="username" label="Username" />
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
              Login
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

export default Login
