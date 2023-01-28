import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import {addToCart, fetchCartByProductId, editCart, fetchCartByUserId} from "../api/requests"
import Pleaselogin from './Pleaselogin.js'

const Products = (props) => {
    const { user, token, allProducts, itemsInCart, setItemsInCart, setFeatureProductId, setAllUserCarts} = props
    const [quantity, setQuantity] = useState(1)
    const [clickedWithoutLogin, setClickedWithoutLogin] = useState(false)
    const [clickedProductId, setClickedProductId] = useState()
    const history = useHistory()

 
    function handleClickFeature(id) {
        console.log ("productId", id)
        setFeatureProductId(id);
        history.push('/feature')
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
    
    

    return (
        <div className="products">
            <div className="ui cards">
                {allProducts.map((product) => {
                    return (
                        <div key={product.id} className="ui card">
                            <div className="content">
                                <h1 className="category-description"  onClick={() => handleClickFeature(product.id)}>{product.description}</h1>
                                <h2 className="header">{product.brand}</h2>
                                <img className="category-image" onClick={() => handleClickFeature(product.id)} src={product.imageUrl}></img>
                                <h5 className="originalPrice">Original Price: ${Math.floor(product.price * 2)}</h5>
                                <h3>Price: ${product.price}</h3>
                                <button className="ui button" onClick={() => {handleAddToCart(product.id)}} >add to cart</button>
                                <div className= "pleaselogin"> {clickedProductId === product.id && clickedWithoutLogin && <Pleaselogin/>} </div>
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