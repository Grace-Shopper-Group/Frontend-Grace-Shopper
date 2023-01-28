import React from "react";
import {useHistory} from 'react-router-dom'


const Pleaselogin = (props) => {

    const {user, order} = props   

    const history = useHistory()
    
    return (
        <div className="thankyou">
        <div className="thankyou-card">
            <div id="thankyou-1"> Please login before adding to cart </div>
            
            <button id="close-thankyou" onClick={()=>{history.push('/login')}}> Login </button>
            <button id="close-thankyou" onClick={()=>{history.goBack()}}> Back </button>
        </div>
 
    </div>
    )
}

export default Pleaselogin;
