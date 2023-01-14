import React, { useState } from "react";

  const EditProduct = (props) => {
    const {product, trigger, productId, setEditName} = props;
    const [editedProduct, setEditedProduct] = useState({
        brand: product.brand,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price
    });

    const handleChange = (e) => {
        e.preventDefault()

        if(e.target.name === "brand"){setEditedProduct({brand: e.target.value});}
        if(e.target.name === "description"){setEditedProduct({ description: e.value });}
        if(e.target.name === "imageUrl"){setEditedProduct({ imageUrl: e.target.value});}
        if(e.target.name === "price"){setEditedProduct({ price: e.target.value});}
    

      };

    if (trigger === true && product.id === productId) {
      return (
        <>
          <input
            type="text"
            name="description"
            placeholder="description"
            value={editedProduct.description} 
            onChange={handleChange}
          />
          <input
            type="text"
            name="brand"
            placeholder="brand"
            value={editedProduct.brand} 
            onChange={handleChange}
          />
          <img className="ui small image" src={product.imageUrl}></img>
          <input
            type="text"
            name="imageUrl"
            placeholder="image url"
            value={editedProduct.imageUrl} 
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="price"
            value={editedProduct.price} 
            onChange={handleChange}
          />
          <button
            className="ui basic red button"
            onClick={() => {
            //   const changedProduct = patchProduct(productId, editedProduct)
            }}
          >
            Save Changes
          </button>
        </>
      );
    } return <>
        <h1 className="description">{product.description}</h1>
        <h2 className="header">{product.brand}</h2>
        <img className="ui small image" src={product.imageUrl}></img>
        <h3>Price: ${product.price}</h3>
    </>
  }

  export default EditProduct;