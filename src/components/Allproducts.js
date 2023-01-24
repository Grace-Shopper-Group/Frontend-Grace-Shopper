import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import {addToCart, fetchCartByProductId, editCart} from "../api/requests"

const Products = (props) => {
    const { user, token, allProducts, itemsInCart, setItemsInCart, setFeatureProductId} = props
    const [quantity, setQuantity] = useState(1)

    const history = useHistory()

 
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
    
    

    return (
        <div className="products">
            <div className="ui cards">
                {allProducts.map((product) => {
                    return (
                        <div key={product.id} className="ui card">
                            <div className="content">
                                <h1 className="category-description"  onClick={() => handleClick(product.id)}>{product.description}</h1>
                                <h2 className="header">{product.brand}</h2>
                                <img className="category-image" onClick={() => handleClick(product.id)} src={product.imageUrl}></img>
                                <h5 className="originalPrice">Original Price: ${Math.floor(product.price * 2)}</h5>
                                <h3>Price: ${product.price}</h3>
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
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;