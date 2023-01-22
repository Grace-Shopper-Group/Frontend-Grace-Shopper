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
    console.log ("registerUser", name, password)
    try {
      const {user, message, token, error} = await apiCall('users/register', {token: null, method: "POST", body: { username: username,
      password: password}} );
      if (!error) {
   
        return {
          error: null,
          token: token,
          message: message,
          user: user
        }
      } else {
        console.log("no success in registerUser()", error);
        return {
          error: error.message,
          token: null,
          message: null
        }
      }
    } catch (error){
      console(error);
      return {
        error: result,
        token: null,
        message: null,
        user: null
      }
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
      const {product, message, token, error} = await apiCall('products', {token: null, method: "Post", body: {brand: brand, description: description, category: category, price: price, img: img}} );
      
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