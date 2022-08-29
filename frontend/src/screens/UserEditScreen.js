import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { getUserProfile, editUserProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { useParams } from 'react-router-dom';

const UserEditScreen = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userEdit = useSelector(state => state.userEdit);
  const { loading: editLoading } = userEdit;

  useEffect(() => {
    if (!user || user._id !== id) {
      dispatch(getUserProfile(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, id, dispatch]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      editUserProfile(id, {
        name,
        email,
        isAdmin,
      })
    );
  };

  return (
    <>
      <Link to="/admin/userlist">Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>
        {error && <Message variant="danger">{error}</Message>}
        {(loading || editLoading) && <Loader />}
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin?"
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary" onClick={submitHandler}>
            Update User
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
