import React from "react";
import {useHistory} from 'react-router-dom'
history = useHistory()

const Thankyou = (props) => {

    const {user, order} = props   
    
    return (
        <div className="thankyou">
        <div className="thankyou-card">
            <div id="thankyou-1"> Thank you for your order!</div>
            <div id="thankyou-2"> Your order number is {`${order.id}`} </div>
            <div id="thankyou-2"> An email confirmation has been sent to {`${user.email}`}  </div>
            <button id="close-thankyou" onClick={()=>{history.push('/category')}}> Close </button>
        </div>
 
    </div>
    )
}

export default Thankyou;

