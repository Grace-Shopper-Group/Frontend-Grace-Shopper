import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {addToCart, fetchCartByUserId, editCart, fetchCartByProductId} from "../api/requests"
import Checkout from "./Checkout.js"

const Cart = (props) => {
    const { user, token, allProducts, category, setFeatureProductId, featureProductId,
    itemsInCart, setItemsInCart, allUserCarts} = props
    const [quantity, setQuantity] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [userCarts, setUserCarts] = useState(allUserCarts)
    const [clickedCheckout, setClickedCheckout] = useState(false)
    const history = useHistory()
  

    useEffect(() => {
         const initialTotalArray = userCarts.map((cart)=>{ return ((cart.quantity)*(cart.product[0].price)).toFixed(2)})
        console.log ("initialTotalArray", initialTotalArray)
        const initialTotal = initialTotalArray.reduce((acc, value) => {
            return acc + Number(value);
          }, 0);
        setGrandTotal(initialTotal.toFixed(2))
        console.log ("initialTotal", initialTotal)
       
    
      }, [userCarts]);

    
    
    async function handleAddToCart(productId) {
        document.getElementById(`quantitySelect-${productId}`).value = "1";
        // console.log ("productId", productId)
        setFeatureProductId(productId);

        const cart = await fetchCartByProductId(token, productId)
        // console.log ("cart",cart)
        
        if (!cart.id){
        const result = await addToCart(token, productId, quantity);
        // console.log ("addtocart result", result)
        setItemsInCart(itemsInCart+quantity)
        setQuantity(1)
        }
        else {
            const editedCart = await editCart(token, cart.id, itemsInCart+quantity);
            console.log ("editCart result", editedCart)
            setItemsInCart(itemsInCart+quantity)
            setQuantity(1)
        }
        
        }

        function handlePlus(productId, price){
            
        const updatedUserCarts= userCarts.map((cart) =>{
                if (cart.productId === productId){
                    return {...cart, quantity: cart.quantity + 1};
                }
                return cart
            })
        
        console.log ("updatedUserCarts", updatedUserCarts)
        setUserCarts(updatedUserCarts)
        

        }

        function handleMinus(productId, price){
            
            const updatedUserCarts= userCarts.map((cart) =>{
                    if (cart.productId === productId){
                        return {...cart, quantity: cart.quantity - 1};
                    }
                    return cart
                })
    
            console.log ("updatedUserCarts", updatedUserCarts)
            setUserCarts(updatedUserCarts)
            }


        
       

console.log("userCarts", userCarts)

    return (
        
      
        <div className="category-products">
           <div id="checkout-total"><div id="checkout-total-container"> 
           <button className="ui button" id="checkout-button" onClick= {()=>{setClickedCheckout(true)}}> Checkout </button>
           <div id="grand-total">Grand Total&nbsp;{grandTotal}</div></div> </div>
           <div>{clickedCheckout && <Checkout setClickedCheckout = {setClickedCheckout} grandTotal= {grandTotal} user = {user} token ={token}/>}</div>
            <div className="cart-products">
           
                {userCarts.map((cart) => {
                    
                   
                    return (
                        <div key={cart.id} className="cart-container">
                        <div className="ui celled grid">
                            <div className="one wide row">
                            <span className= "product-container">
                                <h4 className="category-description"  >{cart.product[0].description}</h4>
                                <h4 className="header">{cart.product[0].brand}</h4>
                                <img className="category-image"  src={cart.product[0].imageUrl}></img>
                                
                                <h3 className="ui green header">${cart.product[0].price}</h3>
                               
                                <button className="ui left attached button"  onClick={() => cart.quantity>=1? handleMinus(cart.product[0].id, cart.product[0].price):null}>-</button>
                                <div className="quantity" >Qty <div>{cart.quantity}</div></div>
                                <button className="ui right attached button" onClick={() => cart.quantity<=9? handlePlus(cart.product[0].id, cart.product[0].price):null}>+</button>
                                <div id="total"> Total 
                                <div id ={`total-${cart.product[0].id}`}>
                                    {((cart.quantity+quantity)*(cart.product[0].price)).toFixed(2)}
                        
                                </div>
                               
                                </div>
                                
                                </span>
                               
                            </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
        </div>
        
    );
 };

export default Cart;
