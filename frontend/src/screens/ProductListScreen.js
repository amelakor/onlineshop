import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import {
  deleteProduct,
  getProductDetails,
  listProducts,
} from '../actions/productActions';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate]);

  const deleteHandler = id => {
    dispatch(deleteProduct(id));
    dispatch(listProducts());
  };

  const createProductHandler = e => {};

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Link to="/admin/createproduct">
            <Button className="my-3">
              <i className="fas fa-plus"></i>
              Add Product
            </Button>
          </Link>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
