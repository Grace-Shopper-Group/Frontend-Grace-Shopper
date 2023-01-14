import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { Login, Register, Home, Products, Category} from './Components/Index';
import {fetchProducts} from './api/requests.js';
import "./index.css";

const App = () => {
  
    const [token, setToken] = useState(
        window.localStorage.getItem("token") || null
      );
    const [allProducts, setAllProducts] = useState([]);
    const [user, setUser] = useState([]);
    const [category, setCategory] = useState("athletic");


      useEffect(()=> {
          const getAllProducts = async () => {
            try{
            const products = await fetchProducts();
            console.log("products useEffect", products.products)
            setAllProducts(products.products);
            } catch(error) {
              console.error(error);
            }
          }
  
          getAllProducts();
        }, []);
        
  return (
    <BrowserRouter>
      <div id="container">
        <div className="nav-bar-title">Sole Quest</div>
        <div id="nav-bar">
          <Link id="Home" to="/">
            <img src="https://img.freepik.com/premium-vector/shoes-logo-template-design-vector_316488-1463.jpg?w=1060" />
          </Link>
          <Link id="Products" to="/products">
            Products
          </Link>
          <Link id="Register" to="/register">
            Register
          </Link>
          <Link id="Login" to="/login">
            Login
          </Link>
          <Link id="cart" to="/cart"></Link>
          {token && user.isAdmin === true ? (
            <Link to="/admindash">Admin</Link>
          ) : null}
          {token ? <Link to="/logout">Logout</Link> : null}
        </div>
        <div id="main-section">
          <Route path="/" exact>
            <Home allProducts={allProducts}></Home>
          </Route>
          <Route path="/products">
            <Products allProducts={allProducts}></Products>
          </Route>
          <Route path="/login">
            <Login setToken={setToken}></Login>
          </Route>
          <Route path="/register">
            <Register setToken={setToken}></Register>
          </Route>
          {/* <Route path = "/register"><Logout></Logout></Route> */}
          {/* <Route path = "/admindash"> <Admindash token = {token}></Admindash></Route>
          <Route path = "/category"> <Category token = {token}></Category></Route> */}
        </div>

      </div>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
