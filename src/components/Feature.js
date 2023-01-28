import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {addToCart, fetchCartByProductId, editCart, fetchCartByUserId} from "../api/requests"
import Pleaselogin from './Pleaselogin.js'

const Feature = (props) => {
    const { user, token, allProducts,featureProductId, setFeatureProductId,
    itemsInCart, setItemsInCart, setAllUserCarts} = props
    const [quantity, setQuantity] = useState(1)
    const [clickedWithoutLogin, setClickedWithoutLogin] = useState(false)
    const [clickedProductId, setClickedProductId] = useState()
    const history = useHistory()
   
    console.log (allProducts)

    
    function clickedBack() {
        console.log ("clickedBack")
        setFeatureProductId("")
        history.push('/')
    }

    function handleClickPleaseLogin(id) {
        console.log ("productId", id)
        setClickedProductId(id);
        }
 
    async function handleAddToCart(productId) {
        if (!token){
            setClickedWithoutLogin(true)
            handleClickPleaseLogin(productId)
        }
        else{
        document.getElementById(`quantitySelect-${productId}`).value = "1";
        console.log ("productId", productId)
        setFeatureProductId(productId);

        const cart = await fetchCartByProductId(token, productId)
        console.log ("cart",cart)
        
        if (!cart.id){
        const result = await addToCart(token, productId, quantity);
        console.log ("addtocart result", result)
        setItemsInCart(itemsInCart+quantity)
        setQuantity(1)
        const userCarts = await fetchCartByUserId(token, user.id);
        for (let userCart of userCarts){
            const addProduct = allProducts.filter((product) => userCart.productId === product.id);
            userCart.product = addProduct;} 
            setAllUserCarts(userCarts)
       
        }
        else {
            const editedCart = await editCart(token, cart.id, itemsInCart+quantity);
            console.log ("editCart result", editedCart)
            setItemsInCart(itemsInCart+quantity)
            setQuantity(1)
            const userCarts = await fetchCartByUserId(token, user.id);
            for (let userCart of userCarts){
                const addProduct = allProducts.filter((product) => userCart.productId === product.id);
                userCart.product = addProduct;} 
                setAllUserCarts(userCarts)
        
        }
        }
        }
       


const featureProduct = allProducts.filter((product)=>{ return product.id === featureProductId})
    
    console.log ("featureProducts", featureProduct[0])
    

    return (
        <div className="feature-products">
            <div className="ui cards">
               
                        <div className="ui card">
                            <div className="feature-content">
                                <h1 className="feature-description">{featureProduct[0].description}</h1>
                                <h2 className="feature-brand"> {featureProduct[0].brand} </h2>
                                <img className="feature-image" src={featureProduct[0].imageUrl}></img>
                                <h3>Price: ${featureProduct[0].price}</h3>
                                <button className="ui button" onClick={() => {handleAddToCart(featureProduct[0].id)}} >add to cart</button>
                                <div className= "pleaselogin"> {clickedProductId === featureProduct[0].id && clickedWithoutLogin && <Pleaselogin/>} </div>
                                <button className="ui button" onClick={() => {clickedBack()}}>Back</button>
                                <span>
                                <div>Qty</div>
                                <select className="ui dropdown" id = {`quantitySelect-${featureProduct[0].id}`}
                                onChange={e => {
                                    const selectedValue = e.target.value;
                                    console.log("selectedValue", selectedValue)
                                    if(selectedValue === "2") {
                                        setQuantity(2);
                                       }
                                       else if (selectedValue === "1") {
                                        setQuantity(1)
                                       }}}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                                </span>
                                <div>
                                Average rating:
                                <div class="ui star rating" data-rating="5">
                                    <i class="icon active"></i>
                                    <i class="icon active"></i>
                                    <i class="icon active"></i>
                                    <i class="icon active"></i>
                                    <i class="icon active"></i>
                                </div>
                                </div>
                            </div>
                        </div>
                  
            </div>
        </div>
    );
};

export default Feature;



