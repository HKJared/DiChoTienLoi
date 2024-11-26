const login = async (username, password) => {
    try {
      const response = await fetch(" http://192.168.1.104:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account: { username, password } }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const { jwt } = await response.json();
      console.log("Login successful! JWT:", jwt);
  
      return jwt;
    } catch (error) {
      console.error("Error logging in:", error);
      return null;
    }
  }
  
  const getRecipeCategories = async (jwt) => {
    try {
      const response = await fetch("http://192.168.1.104:3000/api/user/recipe-categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authentication": jwt,
        },
      });
  
      if (!response.ok) throw new Error('Network response was not ok');
  
      const data = await response.json(); 
      return data;
    } catch (error) {
      console.error("Error fetching recipe categories:", error);
      return null; 
    }
  };
  
  let categoriesData = null;  // Sử dụng null thay vì None
  
  (async () => {
    const username = "ky1234"; // Thay bằng username thực tế
    const password = "ky1234"; // Thay bằng password thực tế
    console.log('Login ...')
    const jwt = await login(username, password);
    categoriesData = await getRecipeCategories(jwt);
    console.log('this is data:', categoriesData)
  })();


// export {login, getRecipeCategories}