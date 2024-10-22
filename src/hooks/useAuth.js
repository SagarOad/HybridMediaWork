const useAuth = () => {
    const register = (name, email, password) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        throw new Error('User already registered');
      }
      
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
    };
  
    const login = (email, password) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === email && user.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Set the logged-in user
      localStorage.setItem('user', JSON.stringify(user));
      
      // Load the user-specific cart from localStorage and store it globally for session use
      const userCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
      localStorage.setItem('cart', JSON.stringify(userCart)); 
    };
  
    const logout = () => {
      // Get the current user before clearing the cart
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        // Save the current session's cart back to the user-specific cart key
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
        
        // Now clear the session cart and user
        localStorage.removeItem('cart'); // Clear global cart
        localStorage.removeItem('user'); // Clear logged-in user session
      }
    };
  
    const isAuthenticated = () => !!localStorage.getItem('user');
  
    return { register, login, logout, isAuthenticated };
  };
  
  export default useAuth;
  