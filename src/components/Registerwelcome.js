import React from "react";



const Registerwelcome = (props) => {

    const {username} = props

    
    
    return (
    <div className="welcome">
        <div className="welcome-card">
            <div id="register-welcomeuser1"> Welcome!</div>
            <div id="register-welcomeuser2"> You are now registered as {username} </div>
           
        </div>
 
    </div>
    )
}

export default Registerwelcome;

