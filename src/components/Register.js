import React, {useState} from 'react';
import { registerUser, logInUser } from '../api/requests';
import {Registerwelcome} from './Registerwelcome';


const Register = (props) => {
    const setToken = props.setToken;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registered, setRegistered] = useState(false);

   

    const onSubmitHandler = async (event) => {
        //console.log("onSubmitHandler() called");
        event.preventDefault();
        const {error, token, message, user} = await registerUser(username, password);
        
        setToken(token);
        window.localStorage.setItem('token', token);

        setUsername("");
        setPassword("");
    }

   
        const handleRegister = () => {
        setRegistered(true);
        setTimeout(() => {setRegistered(false)}, "2000");
     }

    
    return (<><form className="login-form" onSubmit={onSubmitHandler}>
        <h1>SignUp Form</h1>
        <div className="field">
            <label>Username</label>
            <input
                type="text"
                value={username}
                placeholder="username"
                required
                onChange={(event) => { setUsername(event.target.value); } } />

        </div>
        <div className="field">
            <label>Password</label>
            <input
                type="password"
                value={password}
                placeholder="password"
                minLength="8"
                required
                onChange={(event) => { setPassword(event.target.value); } } />
        </div>
        <button className="submit-form" type="submit" onClick={handleRegister}>Submit</button>
        <div>
            {registered && <Registerwelcome />}
        </div>

        {/*register*/}

     </form>
       </>);
    
    
}


export default Register
