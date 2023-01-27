import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Login, Register, Home, Products, Category, Admindash, Feature, Checkout } from './components/Index';
import { fetchProducts } from './api/requests.js';
import "./index.css"

const App = () => {

  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [allProducts, setAllProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [category, setCategory] = useState("athletic");
  const [featureProductId, setFeatureProductId] = useState();
  const [isAdmin, setIsAdmin] = useState(false)
  const [itemsInCart, setItemsInCart] = useState(0)

  console.log("itemsInCart", itemsInCart)

  const logOut = () => {
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const products = await fetchProducts();
        setAllProducts(products.products);
      } catch (error) {
        console.error(error);
      }
    }

    getAllProducts();
  }, []);

  return (

    <BrowserRouter>

      <div id="container">
        <div id="nav-bar-title">Sole Quest</div>
        <div id="nav-bar">
          <Link id="Home" to="/">  <img src="https://img.freepik.com/premium-vector/shoes-logo-template-design-vector_316488-1463.jpg?w=1060" /></Link>
          <Link id="Products" to="/products">Products</Link>
          <Link id="Admin" to="/admindash">Admin</Link>
          {!token ? <Link id="Login" to="/login">Login</Link> : <Link id="Logout" to="/" onClick={logOut}>Logout</Link>}
          {!token ? <Link id="Register" to="/register">Register</Link> : null}
          {itemsInCart ? <Link className="shopping cart icon" to="/checkout">{itemsInCart} <i className="shopping cart icon"></i></Link> : null}

        </div>
        <div id="main-section">
          <Route path="/Checkout"><Checkout>Checkout={Checkout}</Checkout></Route>
          <Route path="/" exact><Home allProducts={allProducts} setCategory={setCategory}></Home></Route>
          <Route path="/products"><Products allProducts={allProducts} user={user} token={token}
            itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} setFeatureProductId={setFeatureProductId}></Products></Route>
          <Route path="/login"><Login setToken={setToken} ></Login></Route>
          <Route path="/register"><Register setToken={setToken}></Register></Route>
          {/* <Route path = "/register"><Logout></Logout></Route> */}
          <Route path="/admindash"> <Admindash token={token} allProducts={allProducts} isAdmin={isAdmin} setIsAdmin={setIsAdmin}></Admindash></Route>
          <Route path="/category"> <Category token={token} user={user} category={category}
            setCategory={setCategory} allProducts={allProducts} setFeatureProductId={setFeatureProductId}
            itemsInCart={itemsInCart} setItemsInCart={setItemsInCart}></Category></Route>
          <Route path="/feature"> <Feature token={token} user={user} featureProductId={featureProductId}
            setFeatureProductId={setFeatureProductId} allProducts={allProducts} itemsInCart={itemsInCart}
            setItemsInCart={setItemsInCart}></Feature></Route>
        </div>
      </div>
    </BrowserRouter>
  )
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);