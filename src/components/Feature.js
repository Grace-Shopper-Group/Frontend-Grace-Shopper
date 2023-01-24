import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {addToCart} from "../api/requests"

const Feature = (props) => {
    const { user, token, allProducts,featureProductId, setFeatureProductId} = props
    const [quantity, setQuantity] = useState(1)

    const history = useHistory()
   
    console.log (allProducts)

    
    function clickedBack() {
        console.log ("clickedBack")
        setFeatureProductId("")
        history.push("/category")
    }

    function handleAddToCart(id) {
        console.log ("productId", id)
        setFeatureProductId(id);

       
        
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
                                <span>
                                <button className="feature-cart-button" onClick={() => {/* add to cart function */}} >add to cart</button>
                                <button className="feature-cart-button" onClick={() => {clickedBack()}}>Back</button>
                                </span>
                                <span>
                                <div>Qty</div>
                                <select className="ui dropdown" 
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



