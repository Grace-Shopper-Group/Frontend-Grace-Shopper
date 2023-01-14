import React, { useState } from "react";

const Feature = (props) => {
    const { user, token, allProducts, featureId, setFeatureId} = props

    console.log ("allProducts", allProducts[0].category) 
const featureProduct = allProducts.filter((product)=>{ return product.id === featureId})
    
    console.log ("featureProduct", featureProduct)
    

    return (
        <div className="products">
            <div className="ui cards">
                {categoryProducts.map((product) => {
                    return (
                        <div key={product.id} className="ui card">
                            <div className="content">
                                <h1 className="description">{product.description}</h1>
                                <h2 className="header">{product.brand}</h2>
                                <img className="ui small image" src={product.imageUrl}></img>
                                <h3>Price: ${product.price}</h3>
                                <button className="ui button" onClick={() => {/* add to cart function */}} >add to cart</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Feature;