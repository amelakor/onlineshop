import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';

import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { Message } from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();

  const { cartItems } = useSelector(state => state.cart);

  const { id } = useParams();
  const qty = Number(searchParams.get('qty'));

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCarthandler = id => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate(`/shipping`);
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map(item => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={e =>
                        dispatch(addToCart(item._id, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.stock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCarthandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, cur) => acc + cur.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, cur) => acc + cur.qty * cur.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
