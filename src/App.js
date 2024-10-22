import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import useAuth from "./hooks/useAuth";
import { store } from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import { loadCartFromLocalStorage } from './redux/productSlice';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// A simple ProtectedRoute component to manage authentication
const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth(); // Move the hook call to the top level

  useEffect(() => {
    // Load cart only if user is authenticated
    if (isAuthenticated()) {
      dispatch(loadCartFromLocalStorage());
    }
  }, [dispatch, isAuthenticated]); // Add isAuthenticated as a dependency

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
