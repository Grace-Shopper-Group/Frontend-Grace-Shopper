import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { Login, Register, Home, Products, Admindash} from './Components/Index';
import {fetchProducts} from './api/requests.js';

const App = () => {
  
    const [token, setToken] = useState(
        window.localStorage.getItem("token") || null
      );
      const [allProducts, setAllProducts] = useState([]);
      const [user, setUser] = useState([]);
      useEffect(()=> {
          const getAllProducts = async () => {
            try{
            const products = await fetchProducts();
            setAllProducts(products.products);
            } catch(error) {
              console.error(error);
            }
          }
  
          getAllProducts();
        }, []);

      return (
        
    <BrowserRouter>

<div id = "container">
    <div id = "nav-bar"> 
    <div className= "nav-bar-title">Sole Quest Men's Shoes</div>
    <Link to = "/products">Products</Link>
    <Link to = "/register">Register</Link>
    <Link to = "/login">Login</Link>
    {/* { token && user.isAdmin === true ?*/} <Link to = "/admindash">Admin</Link>
    {token ? <Link to = "/logout">Logout</Link> : null }
    </div>
      <div id = "main-section">

          <Route path = "/" exact><Home allProducts = {allProducts}></Home></Route>
          <Route path = "/products"><Products allProducts={allProducts}></Products></Route>
          <Route path = "/login"><Login setToken = {setToken}></Login></Route>
          <Route path = "/register"><Register setToken = {setToken}></Register></Route>
          {/* <Route path = "/register"><Logout></Logout></Route> */}
          <Route path = "/admindash"> <Admindash token = {token} allProducts={allProducts}></Admindash></Route>
          {/* <Route path = "/category"> <Category token = {token}></Category></Route> */}
      </div>
    </div>
  </BrowserRouter>
  )
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);