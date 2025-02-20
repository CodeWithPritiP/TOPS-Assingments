import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { addToCart, updateCart } from "./Toolkit/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const dispatch = useDispatch();
  const cart = useSelector((result) => result.cart.items);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const menResponse = await fetch("http://localhost:3000/men_products");
      const menData = await menResponse.json();

      const womenResponse = await fetch("http://localhost:3000/women_products");
      const womenData = await womenResponse.json();

      const allProducts = [...menData, ...womenData];
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCartHandler = (product) => {
    const userId = localStorage.getItem("id");
    let existingItem = cart.find(
      (item) => item.productid === product.id && item.userid === userId
    );

    if (existingItem) {
      dispatch(
        updateCart({ id: existingItem.id, quantity: existingItem.quantity + 1 })
      );
    } else {
      product.userid = userId;
      dispatch(addToCart(product));
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const applyFilters = () => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  };

  const productsToDisplay =
    filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <Container className="my-5">
      <Row>
        <Col md={9}>
          <Row>
            {productsToDisplay.map((product) => (
              <Col md={4} sm={6} xs={12} key={product.id}>
                <Card className="mb-4">
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>{product.price}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => addToCartHandler(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={3}>
          <h2>Filters</h2>
          <Form>
            <Form.Group controlId="categorySelect">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="all">All</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
