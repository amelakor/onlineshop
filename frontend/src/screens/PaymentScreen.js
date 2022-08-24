import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping', { replace: true });
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = e => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
