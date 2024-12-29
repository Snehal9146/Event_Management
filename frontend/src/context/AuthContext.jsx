import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser,signupUser } from "../helpers/api_communicator";
import { checkAuthStatus, setAuthHeader} from "../helpers/axios_helper"

/*
type User = {
    name: string;
    email: string;
};

type UserAuth = {
    user: User|null;
    isLoggedIn: boolean;
    login: (email:string, password:string) => Promise<void>;
    signup: (name:string ,email:string, password:string) => Promise<void>;
    logout: ()=>Promise<void>
}*/

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    console.log("auth reached")

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /*useEffect(() => {
        // fetch if the user's cookies are valid then skip login
        async function checkStatus() {
          const data = checkAuthStatus();
          if (data.message=="ok") {
            setIsLoggedIn(true);
          }
        }

        checkStatus();
      }, []);*/

    const login = async (username, password)=>{
        setAuthHeader(null)
        const data = await loginUser(username, password);
        if(data){
            setUser({ id:data.id, username: data.username, name : data.name});
            setIsLoggedIn(true);
            //window.location.reload();
        }
    };

    const signup = async (name, username, email, password) => {
        setAuthHeader(null)
        const data = await signupUser(name,username, email, password);
        if (data) {
          setUser({id:data.id, username: data.username, name: data.name });
          setIsLoggedIn(true);
        }
      };

    const logout = async ()=>{
        setAuthHeader(null);
        setIsLoggedIn(false);
        setUser(null);
    };

    const value={
        user, //state
        isLoggedIn, //state
        login, //async func
        signup, //async func 
        logout, //async func
    };

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>

}
export const useAuth = () => useContext(AuthContext);
export const getAuthContext = ()=> useContext(AuthContext); //context used by the users. kinda like a getter function