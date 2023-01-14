import React, { useState } from "react";

const Category = (props) => {
    const { user, token, allProducts, category, setCategory} = props

    console.log ("allProducts", allProducts[0].category) 
const categoryProducts = allProducts.filter((product)=>{ return product.category === category})
    
    console.log ("categoryProducts", categoryProducts)
    

    return (
        <div className="category-products">
            <div className="ui cards">
                {categoryProducts.map((product) => {
                    return (
                        <div key={product.id} className="ui card">
                            <div className="category-content">
                                <h1 className="category-description">{product.description}</h1>
                                <h2 className="category-brand">{product.brand}</h2>
                                <img className="category-image" src={product.imageUrl}></img>
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