import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { Login, Register, Home, Products, Category, Admindash, Feature, Cart, Checkout} from './components/Index';
import { fetchProducts, fetchCartByUserId } from './api/requests.js';

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

  const [itemsInCart, setItemsInCart] = useState (0)
  const [allUserCarts, setAllUserCarts] = useState()
 

  console.log ("itemsInCart", itemsInCart, "token", token)


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

      <div id="navcontainer">
        {/* <div className='namelogo'><img className='name' src={`${process.env.PUBLIC_URL}/images/namelogo.png`}></img></div> */}
        <div id="nav-bar">
          <Link id="Home" to="/">  <img className='logo' src={`${process.env.PUBLIC_URL}/images/logo.png`} /></Link>
          <Link id="Products" to="/products">Products</Link>
          {!token ? <Link id="Login" to="/login">Login</Link> : <Link id="Logout" to="/" onClick={logOut}>Logout</Link>}
          {!token ? <Link id="Register" to="/register">Register</Link> : null}
          
          <Link to="/cart"><span>{(itemsInCart>0)?itemsInCart:null}<img className="ui mini image" src="http://cdn.onlinewebfonts.com/svg/img_61350.png"></img></span></Link>
          <Link id="Admin" to="/admindash"><img className='ui mini image' src='https://cdn-icons-png.flaticon.com/512/1/1760.png'></img></Link>


        </div>
        <div id="main-section">
          <Route path="/Checkout"><Checkout>Checkout={Checkout}</Checkout></Route>
          <Route path="/" exact><Home allProducts={allProducts} setCategory={setCategory}></Home></Route>
          <Route path="/products"><Products allProducts={allProducts} user={user} token={token}

            itemsInCart = {itemsInCart} setItemsInCart = {setItemsInCart} setFeatureProductId = {setFeatureProductId} 
            setAllUserCarts={setAllUserCarts}></Products></Route>
          <Route path="/login"><Login setToken={setToken} setUser={setUser} ></Login></Route>

          <Route path="/register"><Register setToken={setToken}></Register></Route>
          {/* <Route path = "/register"><Logout></Logout></Route> */}
          <Route path="/admindash"> <Admindash token={token} allProducts={allProducts} isAdmin={isAdmin} setIsAdmin={setIsAdmin}></Admindash></Route>
          <Route path="/category"> <Category token={token} user={user} category={category}
            setCategory={setCategory} allProducts={allProducts} setFeatureProductId={setFeatureProductId}
            itemsInCart = {itemsInCart} setItemsInCart = {setItemsInCart} setAllUserCarts={setAllUserCarts}></Category></Route>
          <Route path="/feature"> <Feature token={token} user={user} featureProductId={featureProductId}
            setFeatureProductId={setFeatureProductId} allProducts={allProducts} itemsInCart = {itemsInCart} 
            setItemsInCart = {setItemsInCart} setAllUserCarts={setAllUserCarts}></Feature></Route>
          <Route path="/cart"> <Cart token={token} user={user} featureProductId={featureProductId}
            setFeatureProductId={setFeatureProductId} allProducts={allProducts} itemsInCart = {itemsInCart} 
            setItemsInCart = {setItemsInCart} allUserCarts = {allUserCarts}></Cart></Route>

        </div>
      </div>
    </BrowserRouter>
  )
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);