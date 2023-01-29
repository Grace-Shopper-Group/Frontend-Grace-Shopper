import React, {useState} from "react";
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Thankyou from './Thankyou.js'

const CURRENCY = 'USD'

const successPayment = data => {
    alert('Payment Successful')
    // history.push('/thankyou')
}
const errorPayment = data => {
    alert(data)
}
const onToken = (amount, description, handleCheckoutSuccess) => async token => {
    try {
        const { data } = await axios.post('/api/stripe/checkout', {
            description,
            source: token.id,
            currency: CURRENCY,
            amount
        })
        successPayment(data)
        handleCheckoutSuccess()
    } catch (error) {
        errorPayment(error)
    }
}

const ConfirmCheckout = (props) => {

    const {name, description, amount, handleCheckoutSuccess, token, user, setClickedSubmit, firstname, lastname, 
        streetAddress, city, state, zip, phone, email, grandTotal, setItemsInCart} = props
    
    const [thankyou, setThankYou] = useState(false)

    const history = useHistory()

    function clickedPlacedOrder(){
        setItemsInCart(0)
        setThankYou(true)
        setTimeout(() => {
            setThankYou(false)
            setClickedSubmit(false)
            history.push('/')
        }, "9000");
    }
    
    return (
        <div className="confirm-checkout">

        <div className="confirm-checkout-card">
            <div id="order-summary1"> Order Summary</div>
            <div id="order-summary2"> Ship To:</div>
            <div id="order-summary3"> {firstname}&nbsp;{lastname} </div>
            <div id="order-summary4"> {streetAddress}</div>
            <div id="order-summary5"> {city},&nbsp;{state}&nbsp;{zip}</div>
            <div id="order-summary6"> Phone:&nbsp;{phone}</div>
            <div id="order-summary7"> Email:&nbsp;{email}</div>
            <div id="order-summary8"> Total Payment:&nbsp;{grandTotal}</div>
            </div>
        <div>
        
            <StripeCheckout
                name={name}
                description={description}
                amount={amount}
                token={onToken(amount, description, handleCheckoutSuccess)}
                currency={CURRENCY}
                stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
                label="Pay with 💳"
            />
        </div>
        <button className="ui button" onClick={()=>{clickedPlacedOrder()}}>Place Order</button>
        <div>{thankyou && <Thankyou email= {email}/>}</div>
    </div>
    )
}

export default ConfirmCheckout;

