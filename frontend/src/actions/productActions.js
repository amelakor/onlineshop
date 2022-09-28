import axios from 'axios';
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
} from '../constants/productConstants';
export const listProducts = () => async dispatch => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    const { data } = await axios.get('/api/products');

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = id => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: PRODUCT_DELETE_REQUEST });

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addProduct = productData => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const config = {
      'Content-Type': 'application/json',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: PRODUCT_ADD_REQUEST });

    const product = await axios.post(`/api/products`, productData, config);

    dispatch({ type: PRODUCT_ADD_SUCCESS, payload: product });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editProduct = (id, productData) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const config = {
      'Content-Type': 'application/json',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: PRODUCT_EDIT_REQUEST });

    const product = await axios.put(`/api/products/${id}`, productData, config);

    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: product });
  } catch (error) {
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addReview = (id, review) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const config = {
      'Content-Type': 'application/json',
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

    await axios.post(`/api/products/${id}/review`, review, config);

    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
