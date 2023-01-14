import React, { useState } from "react";
import { EditProduct, DeleteProduct } from "./Index";

const AdminDash = (props) => {
  const { user, tokenString, allProducts } = props;
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [newProduct, setNewProduct] = useState({
    brand: '',
    description: '',
    imageUrl: '',
    price: ''
});

const handleChange = (e) => {
    e.preventDefault()

    if(e.target.name === "brand"){
        const brandNew = e.target.value;
        setNewProduct({brand: brandNew})
    };

    if (e.target.name === "description"){
        const descNew = e.target.value;
        setNewProduct({description: descNew}) 
    };

    if (e.target.name === "imageUrl"){
        const imgNew = e.target.value;
        setNewProduct({imageUrl: imgNew}) 
    };

    if (e.target.name === "price"){
        const priceNew = e.target.value;
        setNewProduct({price: priceNew})
    };
}

const handleClear = (e) => {
    e.preventDefault()

    setNewProduct({
        brand: '',
        description: '',
        imageUrl: '',
        price: ''
    })
}

    return (
        <div className="dashboard">
            <h1 className="ui grey header">ADMIN DASHBOARD</h1>
        <div className="ui cards">
            
        <div className="ui card" id="addProduct">
            <h2 className="ui grey header">CREATE PRODUCT</h2>
            <p>Please fill in all information.</p>
            <br></br>
            <div className="ui input">
                
            <input 
                type="text"
                value={newProduct.description}
                name="description"
                placeholder="description"
                onChange={handleChange}
            />
            </div>
            <div className="ui input">
            <input
                type="text"
                value={newProduct.brand}
                name="brand"
                placeholder="brand"
                onChange={handleChange}
            />
            </div>
            <div className="ui input">
            <input
                type="text"
                value={newProduct.imageUrl}
                name="imageUrl"
                placeholder="image url"
                onChange={handleChange}
            />
            </div>
            <div className="ui input">
            <input
                type="text"
                value={newProduct.price}
                name="price"
                placeholder="price"
                onChange={handleChange}
            />
            </div>

            {editMode === false && deleteMode === false ? (
            <>
            <br></br>
            <span>
            <button className="ui red button" id="smallButtons" onClick={handleClear}>Clear</button>
            <button className="ui green button" id="smallButtons">Create</button>
            </span>
           
           
            </> ) : "Currently making changes"} 

            </div>
            
            

        {allProducts.map((product) => {
        

          return (
            <div key={product.id} className="ui card">
              <div className="content">
                {(editMode === true && deleteMode === false) ? (
                   <div>
                   <EditProduct
                   product={product}
                   editingProduct={currentProduct}
                   editMode={editMode}
                   setEditMode={setEditMode}>
                   </EditProduct>
                   {((product.id !== currentProduct.id) ? (
                        <div>
                        <p>Currently making changes</p>
                        </div>):'')}
                   </div>
                ) : (deleteMode === true && editMode === false) ? (
                    <div>
                        <DeleteProduct
                        product={product}
                        currentProduct={currentProduct}
                        deleteMode={deleteMode}
                        setDeleteMode={setDeleteMode}>
                        </DeleteProduct>
                        {((product.id !== currentProduct.id) ? (
                        
                        <div>
                            <p>Currently making changes</p>
                        </div>):'')}
                    </div>
                    
                    ) : 
                    (<>
                        <h1 className="description">{product.description}</h1>
                        
                        <h2 className="header">{product.brand}</h2>
                        
                        <img className="ui small image" src={product.imageUrl}></img>
                        
                        <h3>Price: ${product.price}</h3>
                        
                        <button className="ui basic red button" id="smallButtons" onClick={() => {
                        setCurrentProduct(product);
                        setEditMode(true);}}>Edit</button>
                        
                        <button className="ui red button" id="smallButtons" onClick={() => {
                        setCurrentProduct(product)
                        setDeleteMode(true);
                        }}>Delete</button>
                        </>)}
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default AdminDash;

