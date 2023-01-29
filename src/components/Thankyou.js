import React from "react";
import {Link} from 'react-router-dom'

const Thankyou = (props) => {


    const {user, order, email} = props   

    

    return (
        <div className="thankyou">
        <div className="thankyou-card">
            <div id="thankyou-1"> Thank you for your order!</div>
            <div id="thankyou-2"> Your order number is 97898537452`</div>
            <div id="thankyou-2"> An email confirmation has been sent to {`${email}`}  </div>
            <Link id="Home" to="/"><button id="close-thankyou"> Close </button></Link>
        </div>
 
    </div>
    )
}

export default Thankyou;

