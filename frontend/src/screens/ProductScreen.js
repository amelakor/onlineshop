import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { getProductDetails, addReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';

const ProductScreen = props => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, product, error } = productDetails;

  const productAddReview = useSelector(state => state.productAddReview);
  const {
    loading: addReviewLoading,
    success: addReviewSuccess,
    error: addReviewError,
  } = productAddReview;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id, addReviewLoading, dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const isAlreadyReviewed = () => {
    return (
      product.reviews.length > 0 &&
      product.reviews.some(review => review.user == userInfo._id)
    );
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(addReview(id, { rating, comment }));
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.stock > 0 ? 'In stock' : 'Out of stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.stock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.stock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.stock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              {addReviewSuccess && isAlreadyReviewed && (
                <Message variant="success">Review Added</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map(review => {
                  return (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating}></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  );
                })}
                {!addReviewSuccess && (
                  <ListGroup.Item>
                    <h3>Add Review</h3>
                    {addReviewError && (
                      <Message variant="danger">{addReviewError}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                          >
                            <option value=""> Select...</option>
                            <option value="1"> 1 - Poor</option>
                            <option value="2"> 2 - Fair</option>
                            <option value="3"> 3 - Good</option>
                            <option value="4"> 4 - Very good</option>
                            <option value="5"> 5 - Excelent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">login</Link>
                        to write review
                      </Message>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
