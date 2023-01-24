import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {addToCart, fetchCartByProductId, editCart} from "../api/requests"

const Feature = (props) => {
    const { user, token, allProducts,featureProductId, setFeatureProductId,
    itemsInCart, setItemsInCart} = props
    const [quantity, setQuantity] = useState(1)

    const history = useHistory()
   
    console.log (allProducts)

    
    function clickedBack() {
        console.log ("clickedBack")
        setFeatureProductId("")
        history.push("/category")
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
                            
                            </div>
                        </div>
                  
            </div>
        </div>
    );
};

export default Feature;



