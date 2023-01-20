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
  

export const apiCall = async (endpoint, defaultOptions= {}) => {
    const {token, method, body} = defaultOptions;
    
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
      const response = await fetch(`${BASEURL}/${endpoint}`, options);
    
      const result = await response.json();
      
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