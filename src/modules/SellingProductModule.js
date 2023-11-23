import { createActions, handleActions } from 'redux-actions';
import { POST_PRODUCT } from '../path/to/actions';

/* 초기값 */
const initialState = {
  product: null,
  products: [],
  mealProducts: [],
  dessertProducts: [],
  beverageProducts: [],
};

/* 액션 */
export const {
  getProduct,
  getProducts,
  getProductsMeal,
  getProductsDessert,
  getProductsBeverage,
  postProduct,
  putProduct,
} = createActions(
  {
    GET_PRODUCT: (product) => ({ product }),
    GET_PRODUCTS: (products) => ({ products }),
    GET_PRODUCTS_MEAL: (mealProducts) => ({ mealProducts }),
    GET_PRODUCTS_DESSERT: (dessertProducts) => ({ dessertProducts }),
    GET_PRODUCTS_BEVERAGE: (beverageProducts) => ({ beverageProducts }),
    POST_PRODUCT: (product) => ({ product }),
    PUT_PRODUCT: (product) => ({ product }),
  },
  { prefix: 'product' } // 액션 타입에 접두사 추가
);

/* 리듀서 */
const productReducer = handleActions(
  {
    [GET_PRODUCT]: (state, { payload }) => ({ ...state, product: payload.product }),
    [GET_PRODUCTS]: (state, { payload }) => ({ ...state, products: payload.products }),
    [GET_PRODUCTS_MEAL]: (state, { payload }) => ({ ...state, mealProducts: payload.mealProducts }),
    [GET_PRODUCTS_DESSERT]: (state, { payload }) => ({ ...state, dessertProducts: payload.dessertProducts }),
    [GET_PRODUCTS_BEVERAGE]: (state, { payload }) => ({ ...state, beverageProducts: payload.beverageProducts }),
    [POST_PRODUCT]: (state, { payload }) => ({ ...state, product: payload.product }),
    [PUT_PRODUCT]: (state, { payload }) => ({ ...state, product: payload.product }),
  },
  initialState
);


export default productReducer;
