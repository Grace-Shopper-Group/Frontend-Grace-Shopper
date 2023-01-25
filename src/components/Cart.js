import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {addToCart, fetchCartByUserId, editCart} from "../api/requests"

const Cart = (props) => {
    const { user, token, allProducts, category, setFeatureProductId, featureProductId,
    itemsInCart, setItemsInCart} = props
    const [quantity, setQuantity] = useState()
    const [cartProductIds, setCartProductIds] = useState()
    const history = useHistory()
    console.log ("user", user)
   
   
    useEffect(() => {
        const getUserCart = async () => {
          try {
            const carts = await fetchCartByUserId(user.id);
            console.log ("carts", carts)
            const productIds = await carts.map((cart) => cart.productId);
            setCartProductIds(productIds);

          } catch (error) {
            console.error(error);
          }
        }
    
        getUserCart();
      }, [itemsInCart]);
   


    
    function handleClick(id) {
        console.log ("productId", id)
        setFeatureProductId(id);
        history.push('/feature')
       
        }
    async function handleAddToCart(productId) {
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
        }
        else {
            const editedCart = await editCart(token, cart.id, itemsInCart+quantity);
            console.log ("editCart result", editedCart)
            setItemsInCart(itemsInCart+quantity)
            setQuantity(1)
        }
        
        }
        console.log ("cartProductIds", cartProductIds)
   
        const cartProducts = allProducts.filter((product) => {
            return cartProductIds.includes(product.id);
          });
    
     console.log ("cartProducts", cartProducts)
    

    return (
        <div className="cart-products">
            <div className="ui cards">
                {cartProducts.map((product) => {
                    return (
                        <div key={product.id} className="ui card">
                        <div className="content">
                            <div className="cart-content">
                                <h1 className="cart-description"  onClick={() => handleClick(product.id)}>{product.description}</h1>
                                <h2 className="header">{product.brand}</h2>
                                <img className="category-image" onClick={() => handleClick(product.id)} src={product.imageUrl}></img>
                                <h3 className="ui red header">Now: ${product.price}</h3>
                                <button className="ui button" onClick={() => {handleAddToCart(product.id)}} >add to cart</button>
                                <span>
                                <div>Qty</div>
                                <select className="ui dropdown" id = {`quantitySelect-${product.id}`}
                                onChange={e => {
                                    const selectedValue = e.target.value;
                                    console.log("selectedValue", selectedValue)
                                    if(selectedValue === "2") {
                                        setQuantity(2);
                                       }
                                       else if (selectedValue === "1") {
                                        setQuantity(1)
                                       }}}>
                                    <option value="0">0</option>    
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
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
