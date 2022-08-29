import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import {
  addProduct,
  editProduct,
  getProductDetails,
} from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { useParams } from 'react-router-dom';

const ProductCreateScreen = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');

  const productDetails = useSelector(state => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
      if (!loading) {
        setName(product.name);
        setBrand(product.brand);
        setPrice(product.price);
        setCategory(product.category);
        setDescription(product.description);
        setStock(product.stock);
        setImage(product.image);
      }
    }
  }, [dispatch, id, loading]);

  const submitHandler = e => {
    e.preventDefault();
    if (id) {
      dispatch(
        editProduct(id, {
          name,
          brand,
          price,
          category,
          description,
          stock,
          image,
        })
      );
    } else {
      dispatch(
        addProduct({
          name,
          brand,
          price,
          category,
          description,
          stock,
          image,
        })
      );
    }

    navigate('/admin/productlist');
  };

  return (
    <>
      <Link to="/admin/productlist">Go Back</Link>

      <FormContainer>
        <h1>{id ? 'Edit' : 'Add'} Product</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={e => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={e => setStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image"
              value={image}
              onChange={e => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" onClick={submitHandler}>
            {id ? 'Edit' : 'Add'} Product
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
