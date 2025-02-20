import Header from './Header'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Cart from './Cart'
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [auth,setAuth] = useState(localStorage.getItem('id') || null )

  useEffect(() => {
    if (auth) {
      localStorage.setItem("id", auth);
    } else {
      localStorage.removeItem("id");
    }
  }, [auth]);
  
  return (
    <>
      <BrowserRouter>
        <Header setAuth={setAuth} auth={auth} />
        <Routes>
          <Route
            path="/"
            element={
              auth ? <Navigate to={"/home"} /> : <Login setAuth={setAuth} />
            }
          ></Route>

          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/home"
            element={auth ? <Home /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/cart"
            element={auth ? <Cart /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App
