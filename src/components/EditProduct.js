import React, { useState } from "react";


  const EditProduct = (props) => {
    const {editingProduct, setEditMode, editMode, product} = props;
    const [editedProduct, setEditedProduct] = useState({
        brand: product.brand,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price
    });
    // console.log(editedProduct)

    const handleChange = (e) => {
        e.preventDefault()

        if(e.target.name === "brand"){
            const brandEdited = e.target.value;
            setEditedProduct({brand: brandEdited})
        };

        if (e.target.name === "description"){
            const descEdited = e.target.value;
            setEditedProduct({description: descEdited}) 
        };

        if (e.target.name === "imageUrl"){
            const imgEdited = e.target.value;
            setEditedProduct({imageUrl: imgEdited}) 
        };

        if (e.target.name === "price"){
            const priceEdited = e.target.value;
            setEditedProduct({price: priceEdited})
        };
    }

    const handleClick = (e) => {
    }
    
    if (editMode === true && product.id === editingProduct.id) {
      return (
      <>
        <div className="ui input">
          <input 
            type="text"
            name="description"
            placeholder="description"
            value={editedProduct.description} 
            onChange={handleChange}
          />
          </div>
          <div className="ui input">
          <input
            type="text"
            name="brand"
            placeholder="brand"
            value={editedProduct.brand} 
            onChange={handleChange}
          />
          </div>
          <img className="ui small image" src={product.imageUrl}></img>
          <div className="ui input">
          <input
            type="text"
            name="imageUrl"
            placeholder="image url"
            value={editedProduct.imageUrl} 
            onChange={handleChange}
          />
          </div>
          <div className="ui input">
          <input
            type="number"
            name="price"
            placeholder="price"
            value={editedProduct.price} 
            onChange={handleChange}
          />
          </div>
          
          <button
            className="ui red button"
            id="mediumButtons"
            onClick={handleClick}
          >
            Save Changes
          </button>
          <button
            className="ui basic red button"
            id="mediumButtons"
            onClick={() => {
                setEditMode(false)
            }}
          >
            Cancel Changes
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