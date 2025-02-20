import React, { useEffect } from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { fetchCart } from "./TOLKIT/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const Header = ({ setAuth, auth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const cartCount = useSelector((result) => {
    console.log(result.cart.items);
    // some of quntity
    // some only curreent use data
    let mycart = result.cart.items.filter((item) => {
      return item.userid == localStorage.getItem("id");
    });
    return mycart.reduce((acc, item) => acc + item.quantity, 0);
  });
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">SwipeCart</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!auth && (
                <>
                  <Nav.Link href="/">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              )}
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav>
            {/* Cart Icon and Logout Button */}
            <Nav>
              {auth && (
                <>
                  <Nav.Link href="/cart">
                    <FaShoppingCart size={20} /> {/* Cart icon */}
                    <span className="ms-2">Cart- {cartCount} </span>{" "}
                  </Nav.Link>
                </>
              )}
              {auth && (
                <>
                  <Button
                    onClick={() => {
                      setAuth(null);
                      localStorage.removeItem("id");
                      navigate("/");
                    }}
                    variant="light"
                    className="ms-3"
                  >
                    <FaSignOutAlt size={18} /> {/* Logout icon */}
                    Logout
                  </Button>{" "}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header