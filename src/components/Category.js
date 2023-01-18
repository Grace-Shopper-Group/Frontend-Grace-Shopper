import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Category = (props) => {
    const { user, token, allProducts, category, setFeatureProductId, featureProductId} = props
    
    const history = useHistory()
   
    console.log ("featureProductId",featureProductId)

    
    function handleClick(id) {
        console.log ("productId", id)
        setFeatureProductId(id);
        history.push('/feature')
        }

   
const categoryProducts = allProducts.filter((product)=>{ return product.category === category})
    
    console.log ("categoryProducts", categoryProducts)
    

    return (
        <div className="category-products">
            <div className="ui cards">
                {categoryProducts.map((product) => {
                    return (
                        <div key={product.id} className="ui card">
                            <div className="category-content">
                                <h1 className="category-description"  onClick={() => handleClick(product.id)}>{product.description}</h1>
                                <h2 className="category-brand">{product.brand}</h2>
                                <img className="category-image" onClick={() => handleClick(product.id)} src={product.imageUrl}></img>
        
                                <h3>Price: ${product.price}</h3>
                                <button className="category-cart-button" onClick={() => {/* add to cart function */}} >add to cart</button>
                            
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Category;
