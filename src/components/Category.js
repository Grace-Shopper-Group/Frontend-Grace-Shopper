import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {addToCart, fetchCartByProductId, editCart} from "../api/requests"

const Category = (props) => {
    const { user, token, allProducts, category, setFeatureProductId, featureProductId,
    itemsInCart, setItemsInCart} = props
    const [quantity, setQuantity] = useState(1)
    const history = useHistory()
   
    console.log ("featureProductId",featureProductId)

    
    function handleClick(id) {
        console.log ("productId", id)
        setFeatureProductId(id);
        history.push('/feature')
       
        }
    async function handleAddToCart(productId) {
        console.log ("productId", productId)
        setFeatureProductId(productId);

        const cartExists = await fetchCartByProductId(token, productId)
        console.log ("cartExists",cartExists)
        
        if (cartExists.cart === undefined){
        const result = await addToCart(token, productId, quantity);
        console.log ("addtocart result", result)

        setItemsInCart(itemsInCart+quantity)
        }
        else if (cartExists){
            const result = await editCart(token, productId, itemsInCart + quantity);
            console.log ("editCart result", result)
            setItemsInCart(itemsInCart+quantity)
        }
        }

   
const categoryProducts = allProducts.filter((product)=>{ return product.category === category})
    
    console.log ("categoryProducts", categoryProducts)
    

    return (
        <div className="category-products">
            <div className="ui cards">
                {categoryProducts.map((product) => {
                    return (
                        <div key={product.id} className="ui card">
                        <div className="content">
                            <div className="category-content">
                                <h1 className="category-description"  onClick={() => handleClick(product.id)}>{product.description}</h1>
                                <h2 className="header">{product.brand}</h2>
                                <img className="category-image" onClick={() => handleClick(product.id)} src={product.imageUrl}></img>
                                <h5 className="originalPrice">Original Price: ${Math.floor(product.price * 2)}</h5>
                                <h3 className="ui red header">Now: ${product.price}</h3>
                                <button className="ui button" onClick={() => {handleAddToCart(product.id)}} >add to cart</button>
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
                    );
                })}
            </div>
        </div>
    );
};

export default Category;
