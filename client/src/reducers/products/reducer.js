import actionTypes from './actionTypes';

const initialState = {
  error: undefined,
  productsList: [],
  singleProduct: {},
  productsListPending: false,
  singleProductPending: false,
  createProductPending: false,
  updateProductPending: false,
  deleteProductsPending: false
};

const GET_PRODUCTS_LIST_REQUEST_START = (state) => {
  return {
    ...state,
    error: undefined,
    productsListPending: true
  };
};

const GET_PRODUCTS_LIST_RESPONSE = (state, action) => {
  const { data } = action.payload;

  return {
    ...state,
    productsListPending: false,
    productsList: data
  };
};

const GET_SINGLE_PRODUCT_REQUEST_START = (state) => {
  return {
    ...state,
    error: undefined,
    singleProductPending: true
  };
};

const GET_SINGLE_PRODUCT_RESPONSE = (state, action) => {
  const { data } = action.payload;

  return {
    ...state,
    singleProductPending: false,
    singleProduct: {
      ...data
    },
  };
};

const CREATE_PRODUCT_REQUEST_START = (state) => {
  return {
    ...state,
    error: undefined,
    createProductPending: true
  };
};

const CREATE_PRODUCT_RESPONSE = (state, action) => {
  const { data } = action.payload;

  return {
    ...state,
    createProductPending: false,
    singleProduct: {
      ...data
    },
  };
};

const UPDATE_PRODUCT_REQUEST_START = (state) => {
  return {
    ...state,
    error: undefined,
    updateProductPending: true
  };
};

const UPDATE_PRODUCT_RESPONSE = (state) => {
  return {
    ...state,
    updateProductPending: false
  };
};

const DELETE_PRODUCT_REQUEST_START = (state) => {
  return {
    ...state,
    error: undefined,
    deleteProductsPending: true
  };
};

const DELETE_PRODUCT_RESPONSE = (state) => {
  return {
    ...state,
    deleteProductsPending: false
  };
};

const CLEAR_PRODUCTS = (state) => {
  return {
    ...state,
    productsList: []
  };
};

const CLEAR_SINGLE_PRODUCT = (state) => {
  return {
    ...state,
    singleProduct: {}
  };
};

const HANDLE_ERROR = (state, action) => {
  const { error } = action.payload;

  return {
    ...state,
    error: `The following error occurred - ${error}`
  };
};

const CLEAR_ERROR = (state) => {
  return {
    ...state,
    error: undefined
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_LIST_REQUEST_START:
      return GET_PRODUCTS_LIST_REQUEST_START(state, action);
    case actionTypes.GET_PRODUCTS_LIST_RESPONSE:
      return GET_PRODUCTS_LIST_RESPONSE(state, action);
    case actionTypes.GET_SINGLE_PRODUCT_REQUEST_START:
      return GET_SINGLE_PRODUCT_REQUEST_START(state, action);
    case actionTypes.GET_SINGLE_PRODUCT_RESPONSE:
      return GET_SINGLE_PRODUCT_RESPONSE(state, action);
    case actionTypes.CREATE_PRODUCT_REQUEST_START:
      return CREATE_PRODUCT_REQUEST_START(state, action);
    case actionTypes.CREATE_PRODUCT_RESPONSE:
      return CREATE_PRODUCT_RESPONSE(state, action);
    case actionTypes.UPDATE_PRODUCT_REQUEST_START:
      return UPDATE_PRODUCT_REQUEST_START(state, action);
    case actionTypes.UPDATE_PRODUCT_RESPONSE:
      return UPDATE_PRODUCT_RESPONSE(state, action);
    case actionTypes.DELETE_PRODUCT_REQUEST_START:
      return DELETE_PRODUCT_REQUEST_START(state, action);
    case actionTypes.DELETE_PRODUCT_RESPONSE:
      return DELETE_PRODUCT_RESPONSE(state, action);
    case actionTypes.CLEAR_PRODUCTS:
      return CLEAR_PRODUCTS(state, action);
    case actionTypes.CLEAR_SINGLE_PRODUCT:
      return CLEAR_SINGLE_PRODUCT(state, action);
    case actionTypes.HANDLE_ERROR:
      return HANDLE_ERROR(state, action);
    case actionTypes.CLEAR_ERROR:
      return CLEAR_ERROR(state, action);
    default:
      return state;
  }
}
