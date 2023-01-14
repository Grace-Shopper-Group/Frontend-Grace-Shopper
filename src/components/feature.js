import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Feature = (props) => {
const { user, token, allProducts, featureId, setFeatureId} = props

const history = useHistory()
   
const featureProduct = allProducts.filter((product)=>{ return product.id == featureId})


function clickedBack() {
    history.push('/category')
    }
    

    return (
             <div className="ui card">
                    <div className="content">
                                <h1 className="description">{featureProduct[0].description}</h1>
                                <h2 className="header">{featureProduct[0].brand}</h2>
                                <img className="ui small image" src={featureProduct[0].imageUrl}></img>
                                <h3>Price: ${featureProduct[0].price}</h3>
                                <span>
                                <button className="ui button" onClick={() => {/* add to cart function */}} >add to cart</button>
                                <button className="ui button" onClick={() => {clickedBack()}}> Back </button>
                                </span>

                    </div>
             </div>
                    
                
          
    );
};

export default Feature;