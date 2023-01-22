import React, { useState } from "react";
import { changeProduct } from "../api/requests";


  const EditProduct = (props) => {
    const { token } = props
    const {editingProduct, setEditMode, editMode, product} = props;
    const [editedBrand, setEditedBrand] = useState(product.brand)
    const [editedDesc, setEditedDesc] = useState(product.description)
    const [editedImg, setEditedImg] = useState(product.imageUrl)
    const [editedCategory, setEditedCategory] = useState(product.category)
    const [editedPrice, setEditedPrice] = useState(product.price)
    // console.log(editedProduct)

    const handleClick = async (e) => {
      console.log(token, editingProduct.id, editedBrand, editedDesc, editedCategory, editedPrice, editedImg)
        const changedProduct = await changeProduct(token, editingProduct.id, editedBrand, editedDesc, editedCategory, editedPrice, editedImg)
        console.log("changedProduct", changedProduct)
        setEditMode(false)
    }
    
    if (editMode === true && product.id === editingProduct.id) {
      return (
        <form onSubmit={handleClick}>
        <div className="ui input">
          <input 
            type="text"
            name="description"
            placeholder="description"
            value={editedDesc}
            onChange={(event) => {setEditedDesc(event.target.value)}}
          />
          </div>
          <div className="ui input">
          <input
            type="text"
            name="brand"
            placeholder="brand" 
            value={editedBrand}
            onChange={(event) => {setEditedBrand(event.target.value)}}
          />
          </div>
          <img className="ui small image" src={product.imageUrl}></img>
          <div className="ui input">
          <input
            type="text"
            name="imageUrl"
            placeholder="image url"
            value={editedImg}
            onChange={(event) => {setEditedImg(event.target.value)}}
          />
          </div>
          <div className="ui input">
          <input
            type="text"
            name="category"
            placeholder="category"
            value={editedCategory}
            onChange={(event) => {setEditedCategory(event.target.value)}}
          />
          </div>
          <div className="ui input">
          <input
            type="number"
            name="price"
            placeholder="price"
            value={editedPrice}
            onChange={(event) => {setEditedPrice(event.target.value)}}
          />
          </div>
          
          <button
            className="ui red button"
            id="mediumButtons"
            type="submit"
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
          
        </form>
      );
    } return <>
        <h1 className="description">{product.description}</h1>
        <h2 className="header">{product.brand}</h2>
        <img className="ui small image" src={product.imageUrl}></img>
        <h3>Category: {product.category}</h3>
        <h5>Original Price: ${Math.floor(product.price * 2)}</h5>
        <h3 className="ui red header">Now: ${product.price}</h3>
    </>
  }

  export default EditProduct;