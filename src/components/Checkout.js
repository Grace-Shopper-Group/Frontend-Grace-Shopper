import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {editUser} from "../api/requests"
import ConfirmCheckout from "./ConfirmCheckout.js"

// const history = useHistory()


const Checkout = ({ token, user, setClickedCheckout, grandTotal, setItemsInCart}) => {

console.log("grandTotal", grandTotal)

const [guest, setGuest] = useState()
const [firstname, setFirstName] = useState()
const [lastname, setLastName] = useState()
const [streetAddress, setStreetAddress] = useState()
const [city, setCity] = useState()
const [state, setState] = useState()
const [zip, setZip] = useState()
const [phone, setPhone] = useState()
const [email, setEmail] = useState()
const [iscustomer, setIsCustomer]=useState (false);
const [clickedSubmit, setClickedSubmit]=useState(false);

const history= useHistory()

 async function handleUserSubmit() {
        event.preventDefault();
        console.log("guest",guest)
        if (guest === "on"){setIsCustomer(true)}
        console.log("iscustomer", iscustomer)
        const results = await editUser(token, user.id, iscustomer, firstname, lastname, streetAddress, city, state, zip, phone, email);
        console.log("edituser results", results)
        // setClickedCheckout(false)
        setClickedSubmit(true)
        // history.push('/category')
       }

    return (<>
        <div id="checkout-form">
        <div id="checkout-form-container">
       
        <form className="ui form" onSubmit={handleUserSubmit}>
            <h1>Checkout</h1>
            
            <div className="field">
                <label>Checkout As Guest?</label>
                <input
                    type="checkbox" 
                    checked={guest} 
                    placeholder="Checkout As Guest?"
                    required
                    onChange={(event) => { setGuest(event.target.value); } } />
            </div>
            
            <div className="field">
                <label>First Name</label>
                <input
                    type="text"
                    value={firstname}
                    placeholder="First Name"
                    required
                    onChange={(event) => { setFirstName(event.target.value); } } />

            </div>
            <div className="field">
                <label>Last Name</label>
                <input
                    type="text"
                    value={lastname}
                    placeholder="Last Name"
                    required
                    onChange={(event) => { setLastName(event.target.value); } } />
            </div>
            <div className="field">
                <label>Street Address</label>
                <input
                    type="text"
                    value={streetAddress}
                    placeholder="Street Address"
                    required
                    onChange={(event) => { setStreetAddress(event.target.value); } } />
            </div>
            <div className="field">
                <label>City</label>
                <input
                    type="text"
                    value={city}
                    placeholder="City"
                    required
                    onChange={(event) => { setCity(event.target.value); } } />
            </div>
            <div className="field">
                <label>State</label>
                <input
                    type="text"
                    value={state}
                    placeholder="State"
                    required
                    onChange={(event) => { setState(event.target.value); } } />
            </div>
            <div className="field">
                <label>Zip Code</label>
                <input
                    type="text"
                    value={zip}
                    placeholder="Zip Code"
                    required
                    onChange={(event) => { setZip(event.target.value); } } />
            </div>
            <div className="field">
                <label>Phone</label>
                <input
                    type="phone"
                    value={phone}
                    placeholder="Phone"
                    required
                    onChange={(event) => { setPhone(event.target.value); } } />
            </div>
            <div className="field">
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    required
                    onChange={(event) => { setEmail(event.target.value); } } />
            </div>
            
            <button className="submit-form" type="submit" >Submit</button>
            <div>
                {/* {orderComplete && <Thankyou first_name = {first_name} />} */}
            </div>
        </form>
        </div>
        <div>{clickedSubmit && <ConfirmCheckout setClickedSubmit = {setClickedSubmit} grandTotal= {grandTotal} user = {user}
        firstname={firstname} lastname={lastname} streetAddress= {streetAddress} city={city} state={state} zip={zip} 
        phone={phone} email= {email} setItemsInCart={setItemsInCart}/>}</div>
        
        </div>
        </>
    )
}

export default Checkout