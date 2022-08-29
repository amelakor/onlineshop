import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productAddReducer,
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import {
  userDetailsReducer,
  userEditReducer,
  userListReducer,
  userLoginReducer,
  userUpdateDetailsReducer,
} from './reducers/userReducers';
import { userRegisterReducer } from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  getMyOrdersReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateDetails: userUpdateDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrders: getMyOrdersReducer,
  userList: userListReducer,
  userEdit: userEditReducer,
  addProduct: productAddReducer,
});
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null;

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
