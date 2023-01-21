import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import { logInUser } from '../api/requests';
import Loginwelcome from './Loginwelcome';



const Login = (props) => {
    const { setToken } = props
   
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    
    const history = useHistory()
   

    const otherOnSubmitHandler = async (event) => {
        // console.log("onSubmitHandler() in Login called");
         event.preventDefault();
         console.log("hello")
         const {error, token, message} = await logInUser(loginUsername, loginPassword);
         console.log("token",token, message)
         setToken(token);
         window.localStorage.setItem('token', token);
         if (token) {
            handleLogin()
         }
         }

    
     const handleLogin = () => {
        setLoggedIn(true)
        setTimeout(() => {
            setLoggedIn(false)
            setLoginUsername("");
            setLoginPassword("");
            history.push('/')
        }, "4000");
       
    }

    return (<>
        <form className="login-form" onSubmit={otherOnSubmitHandler}>
            <h1>Login Form</h1>
            <div className="field">
                <label>Username</label>
                <input
                    type="text"
                    value={loginUsername}
                    placeholder="username"
                    required
                    onChange={(event) => { setLoginUsername(event.target.value); } } />

            </div>
            <div className="field">
                <label>Password</label>
                <input
                    type="password"
                    value={loginPassword}
                    placeholder="password"
                    autoComplete="current-password"
                    minLength="8"
                    required
                    onChange={(event) => { setLoginPassword(event.target.value); } } />
            </div>
            <button className="submit-form" type="submit" >Submit</button>
            <div>
                {loggedIn && <Loginwelcome loginUsername = {loginUsername} />}
            </div>

            {/*login*/}


        </form></>);
    
    
}


export default Login
