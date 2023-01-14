import React, { useState } from "react";
import { EditProduct, DeleteProduct } from "./Index";

const AdminDash = (props) => {
  const { user, tokenString, allProducts } = props;
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  return (
    <div className="dashboard">
      <button
        className="ui green button"
        onClick={() => {
          /* add */
        }}
      >
        Add
      </button>
      <div className="ui cards">
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
                        <button
                        className="ui basic red button"
                        onClick={() => {
                        setCurrentProduct(product);
                        setEditMode(true);
                        }}>Edit</button>
                        <button
                        className="ui red button"
                        onClick={() => {
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

