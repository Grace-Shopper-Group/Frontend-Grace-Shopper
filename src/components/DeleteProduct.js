import React, { useState } from "react";

const DeleteProduct = (props) => {
  const { deleteMode, setDeleteMode, product, currentProduct } = props;
  console.log(deleteMode, product, currentProduct)

if (product.id === currentProduct.id){
    return (
        <div>
        <button className="ui basic red button" id="smallButtons" onClick={() => {setDeleteMode(false)}}>Close</button>
        <h3>{`Are you sure you want to delete ${currentProduct.description}?`}</h3>
        <div className="ui input">
            <input 
            placeholder="Enter Admin Password"
            ></input>
        </div>
        <button className="ui red button" onClick={()=>{handleDelete}}>Yes, I want to delete this forever.</button>
        </div>
        )
    }


    return <>
        <h1 className="description">{product.description}</h1>
        <h2 className="header">{product.brand}</h2>
        <img className="ui small image" src={product.imageUrl}></img>
        <h3>Price: ${product.price}</h3>
    </>
 }


export default DeleteProduct;
