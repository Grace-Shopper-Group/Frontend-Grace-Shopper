import React, {useState} from 'react';
import { logInUser } from '../api/requests';
import {Loginwelcome} from './Loginwelcome';



const Login = (props) => {
    const setToken = props.setToken;
   
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

   
    

    const otherOnSubmitHandler = async (event) => {
        // console.log("onSubmitHandler() in Login called");
         event.preventDefault();
         const {error, token, message} = await logInUser(loginUsername, loginPassword);
      
         setToken(token);
         window.localStorage.setItem('token', token);

         setLoginUsername("");
         setLoginPassword("");
     }

    
     const handleLogin = () => {
        setLoggedIn(true)
        setTimeout(() => {setLoggedIn(false)}, "2000");
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
                    minLength="8"
                    required
                    onChange={(event) => { setLoginPassword(event.target.value); } } />
            </div>
            <button className="submit-form" type="submit" onClick={handleLogin}>Submit</button>
            <div>
                {loggedIn && <Loginwelcome />}
            </div>

            {/*login*/}


        </form></>);
    
    
}


export default Login
