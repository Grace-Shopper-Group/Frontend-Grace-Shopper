import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'


const CURRENCY = 'USD'

const successPayment = data => {
    alert('Payment Successful')
    history.push('/thankyou')
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

const Checkout = ({ name, description, amount, handleCheckoutSuccess }) => {
    return (
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
    )
}

export default Checkout