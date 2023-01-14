import React, { useState } from "react";
import { EditProduct } from './Index'

const AdminDash = (props) => {
  const { user, tokenString, allProducts } = props;
  const [addTrigger, setAddTrigger] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [productId, setProductId] = useState('')
  const [editName, setEditName] = useState("Edit")

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

                <EditProduct product={product} productId={productId} trigger={trigger} setEditName={setEditName}></EditProduct>

                <button
                  className="ui basic red button"
                  onClick={() => {
                    if (trigger === false) {
                      setTrigger(true);
                      setProductId(product.id)
                      setEditName("Cancel Changes")
                    } else {
                      setTrigger(false);
                      setEditName("Edit")
                    }
                  }}
                >
                  {editName}
                </button>
                <button
                  className="ui red button"
                  onClick={() => {
                    /* delete */
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDash;

