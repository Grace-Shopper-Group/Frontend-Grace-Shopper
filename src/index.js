import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { Login, Register, Logout, Admindash, Home} from './Components'
import {fetchProducts} from ('../api/Requests.js')


const App = () => {
  
    const [token, setToken] = useState(
        window.localStorage.getItem("token") || null
      );
      const [allProducts, setAllProducts] = useState([]);
      useEffect(()=> {
          const getAllProducts = async () => {
            try{
            const {products} = await fetchProducts();
            setAllProducts(products);
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
    <Link to = "/register">Register</Link>
    <Link to = "/login">Login</Link>
    { token && user.isAdmin === true ? <Link to = "/admindash">Admin</Link> : null}
    {token ? <Link to = "/logout">Logout</Link> : null }
    </div>
    <div id = "main-section">
          
          <Route path = "/" exact><Home></Home></Route>
          <Route path = "/login"><Login setToken = {setToken}></Login></Route>
          <Route path = "/register"><Register setToken = {setToken}></Register></Route>
          <Route path = "/register"><Logout></Logout></Route>
          <Route path = "/admindash"> <Admindash token = {token}></Admindash></Route>
          <Route path = "/category"> <Category token = {token}></Category></Route>
         
          
  </div>
  </div>
  </BrowserRouter>
  )
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);