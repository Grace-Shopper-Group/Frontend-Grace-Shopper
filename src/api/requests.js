const BASEURL = "http://localhost:1337/api";


const makeHeaders = (token) => {
    const headers = {
      "Content-Type": "application/json",
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  //  console.log(headers);
    return headers;
  };
  

export const apiCall = async (endpoint, defaultOptions = {}) => {
    const {token, method, body} = defaultOptions;

    console.log("defaultOptions", defaultOptions)
    console.log("endpoint", endpoint)
    
    const options = {
      mode: 'cors'
    };
    options.headers = makeHeaders(token);
    if (method) {
      options.method = method;
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    console.log("options", options)
    console.log("baseurl", BASEURL)
      const response = await fetch(`${BASEURL}/${endpoint}`, options);
    console.log("response apiCall",response , options)
      const result = await response.json();
      console.log("result", result)
      return result;
  }

  export const fetchProducts = async (token = null)=> {
    const result = await apiCall('products', {token:token, method:"GET"});
    if (result) {
      return {
        error: null,
        products: result
      }
    } else {
      return {
        error: result.error,
        products: []
      }
    }
  }


  export const registerUser = async (username, password) => {
    console.log ("registerUser", username, password)
    try {
      const results = await apiCall('users/register', {token: null, method: "POST", body: { username: username,
      password: password}} );
      if (results) {
        return results
      } else {
        console.log("no success in registerUser()");
        
      }
    } catch (error){
      console.error(error);
    }
  }

  export const logInUser = async (username, password) => {
      console.log ("hi")
      const {user, message, token, error} = await apiCall('users/login', {token: null, method: "Post", body: {username: username,
      password: password}} );
      
      if (!error) {
       console.log (message, user)
        return {
          error: null,
          token: token,
          message: message,
          user: user
        }
      } else {
        alert("Incorrect User Credentials");
        console.log("no success in logInUser", error);
        return {
          error: error.message,
          token: null,
          message: null,
          user: null
        }
      }
    
    }

    export const editUser = async (tokenString, userId, iscustomer, firstname, lastname, streetAddress, city, state, zip, phone, email) => {
     
      const result = await apiCall((`users/${userId}`), {token: tokenString, method: "PATCH", 
      body: {iscustomer: iscustomer, firstname: firstname, lastname: lastname, streetAddress: streetAddress, city: city, state: state, zip:zip, phone:phone, email:email}} );
      console.log("result", result)
      if (!result.error) {
       console.log (result.message, result.user)
        return {
          error: null,
          user: result.user
        }
      } else {
        alert("Something isn't right");
        console.log("no success in editUser", error);
        return {
          error: error.message,
          message: null,
          user: null
        }
      }
    
    }

    export const changeProduct = async (tokenString, productId, brand, description, category, price, img) => {
      console.log("productIdAPI", productId, tokenString, brand)
      const result = await apiCall((`products/${productId}`), {token: tokenString, method: "PATCH", body: {brand: brand, description: description, category: category, price: price, img: img}} );
      console.log("result", result)
      if (!result.error) {
       console.log (result.message, result.product)
        return {
          error: null,
          token: null,
          product: result.product
        }
      } else {
        alert("Something isn't right");
        console.log("no success in changeProduct", error);
        return {
          error: error.message,
          token: null,
          message: null,
          product: null
        }
      }
    
    }

    export const createProduct = async (brand, description, category, price, img) => {
      const {product, message, token, error} = await apiCall('products', {token: null, method: "Post", body: {brand: brand, description: description, category: category, price: price, imageUrl: img}} );
      
      if (!error) {
       console.log (message, product)
        return {
          error: null,
          token: null,
          message: message,
          product: product
        }
      } else {
        alert("Something isn't right");
        console.log("no success in addProduct", error);
        return {
          error: error.message,
          token: null,
          message: null,
          product: null
        }
      }
    
    }

    export const destroyProduct = async (currentProductId) => {
      const result = await apiCall((`products/${currentProductId}`), {token: null, method: "DELETE", body: null} );
      console.log("result", result)
      if (!result.error) {
       console.log (result.message, result.product)
        return {
          error: null,
          token: null
        }
      } else {
        alert("Something isn't right");
        console.log("no success in destroyProduct", error);
        return {
          error: error.message,
          token: null,
          message: null
        }
      }}

      export const addToCart = async (token, productId, quantity) => {

        const {cart, message, error} = await apiCall('cart', {token: token, method: "POST", body: {productId: productId, quantity: quantity}});
        
        if (!error) {
         console.log ("message, cart",message, cart)
          return {
            error: null,
            token: null,
            message: message,
            cart: cart
          }
        } else {
          alert("Something isn't right with addToCart request");
          console.log("no success in addToCart", error);
          return {
            error: error.message,
            token: null,
            message: null,
            cart: null
          }
        }
      
      }

      export const fetchCartByProductId = async (token, productId) => {

        const results = await apiCall(`cart/${productId}`, {token: token, method: "GET"});
        
        if (results) {
         console.log (results)
          return results
        } else {
          alert("Something isn't right with fetchCartByProductId request");
          console.log("no success in fetchCartByProductId request", error);
          
        }
      
      }

      export const editCart = async (token, cartId, quantity) => {

        const {cart, message, error} = await apiCall(`cart/${cartId}`, {token: token, method: "PATCH", body: {quantity: quantity}});
        
        if (!error) {
         console.log (message, cart)
          return {
            error: null,
            token: null,
            message: message,
            cart: cart
          }
        } else {
          alert("Something isn't right with editCart request");
          console.log("no success in editCart", error);
          return {
            error: error.message,
            token: null,
            message: null,
            cart: null
          }
        }
      
      }

      export const fetchCartByUserId = async (token, userId) => {
        console.log ("token, userId fetchCartByUserId", token, userId)

        const results = await apiCall(`cart/${userId}/cart`, {token: token, method: "GET"});
        
        if (results) {
         console.log (results)
          return results
        } else {
          alert("Something isn't right with fetchCartByUsertId request");
          console.log("no success in fetchCartByUserId request", error);
          
        }
      
      }