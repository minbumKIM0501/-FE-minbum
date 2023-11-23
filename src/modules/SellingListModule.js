const FETCH_MY_PRODUCT_LIST_START = 'FETCH_MY_PRODUCT_LIST_START';
const FETCH_MY_PRODUCT_LIST_SUCCESS = 'FETCH_MY_PRODUCT_LIST_SUCCESS';
const FETCH_MY_PRODUCT_LIST_FAILURE = 'FETCH_MY_PRODUCT_LIST_FAILURE';

const fetchMyProductListStart = () => ({
  type: FETCH_MY_PRODUCT_LIST_START,
});

const fetchMyProductListSuccess = (data) => ({
  type: FETCH_MY_PRODUCT_LIST_SUCCESS,
  payload: data,
});

const fetchMyProductListFailure = (error) => ({
  type: FETCH_MY_PRODUCT_LIST_FAILURE,
  payload: error,
});

const initialState = {
  myProductList: [],
  loading: false,
  error: null,
};

const myProductListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MY_PRODUCT_LIST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MY_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        myProductList: action.payload,
        loading: false,
      };
    case FETCH_MY_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export {
  fetchMyProductListStart,
  fetchMyProductListSuccess,
  fetchMyProductListFailure,
  myProductListReducer,
};
