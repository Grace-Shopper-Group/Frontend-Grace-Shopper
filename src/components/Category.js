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
                        <div className="content">
                            <div className="category-content">
                                <h1 className="description"  onClick={() => handleClick(product.id)}>{product.description}</h1>
                                <h2 className="header">{product.brand}</h2>
                                <img className="ui small image" onClick={() => handleClick(product.id)} src={product.imageUrl}></img>
                                <h5 className="originalPrice">Original Price: ${Math.floor(product.price * 2)}</h5>
                                <h3 className="ui red header">Now: ${product.price}</h3>
                                <button className="ui button" onClick={() => {/* add to cart function */}} >add to cart</button>
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
