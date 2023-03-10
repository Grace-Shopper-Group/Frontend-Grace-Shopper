import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import { logInUser } from '../api/requests';
import Loginwelcome from './Loginwelcome';



const Login = (props) => {
    const { setToken, setUser } = props
   
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    
    const history = useHistory()
   

    const otherOnSubmitHandler = async (event) => {
        // console.log("onSubmitHandler() in Login called");
         event.preventDefault();
         console.log("hello")
         const results = await logInUser(loginUsername, loginPassword);
         console.log("login results", results)
         setUser(results.user)
         setToken(results.token);
         window.localStorage.setItem('token', results.token);
         if (results.token) {
            handleLogin()
         }
         else {alert(` Incorrect username or password` )}
         }

    
     const handleLogin = () => {
        setLoggedIn(true)
        setTimeout(() => {
            setLoggedIn(false)
            setLoginUsername("");
            setLoginPassword("");
            history.push('/')
        }, "2000");
       
    }

    return (<>
        <form className="ui form" onSubmit={otherOnSubmitHandler}>
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
            <button className="ui button" type="submit" >Submit</button>
            <div>
                {loggedIn && <Loginwelcome loginUsername = {loginUsername} />}
            </div>

            {/*login*/}
            </form>
            <h4>Not Registered Yet?&nbsp;&nbsp;Click Here &nbsp;&nbsp;<button className="ui button" onClick={()=> history.push("/register")}>  Register</button></h4>
            </>
        );
    
    
}


export default Login
