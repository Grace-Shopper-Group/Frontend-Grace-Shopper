import React from "react";



const Loginwelcome = (props) => {

    const {loginUsername} = props

    
    
    return (
        <div className="welcome">
        <div className="welcome-card">
            <div id="login-welcomeuser1"> Welcome!</div>
            <div id="login-welcomeuser2"> You are now logged in as {loginUsername} </div>
           
        </div>
 
    </div>
    )
}

export default Loginwelcome;


