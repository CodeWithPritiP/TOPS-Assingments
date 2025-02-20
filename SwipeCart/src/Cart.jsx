import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartQuantity,
  removeFromCart,
} from "./Toolkit/cartSlice";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

const Cart = () => {
  let total = 0;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <Container className="mt-4">
      <h2 className="text-center">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <h4 className="text-center mt-4">Your cart is empty!</h4>
      ) : (
        <Row>
          {cart.map((item) => {
            let subtotal = parseInt(item.price) * parseInt(item.quantity);
            total += subtotal;
            return (
              <Col key={item.id} md={4} className="mb-4">
                <Card className="p-3 shadow-sm">
                  <Image
                    src={item.image}
                    className="mb-2"
                    alt={item.name}
                    fluid
                  />
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text className="mb-1">Price: ₹{subtotal}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      variant="secondary"
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      ➖
                    </Button>
                    <span className="mx-3">{item.quantity}</span>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        dispatch(
                          updateCartQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      ➕
                    </Button>
                  </div>
                  <Button
                    variant="danger"
                    className="w-100 mt-3"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    ❌ Remove
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
      <Row className="mt-4">
        <Col md={{ span: 4, offset: 8 }}>
          <h5>Total: ₹{total}</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
