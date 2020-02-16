import actionTypes from './actionTypes';

function getProductsListRequest() {
  return {
    type: actionTypes.GET_PRODUCTS_LIST_REQUEST_START,
  };
}

function getProductsListResponse(data) {
  return {
    type: actionTypes.GET_PRODUCTS_LIST_RESPONSE,
    payload: {
      data,
    },
  };
}

function getSingleProductRequest(id) {
  return {
    type: actionTypes.GET_SINGLE_PRODUCT_REQUEST_START,
    payload: {
      id,
    },
  };
}

function getSingleProductResponse(data) {
  return {
    type: actionTypes.GET_SINGLE_PRODUCT_RESPONSE,
    payload: {
      data,
    },
  };
}

function createProductRequest(data) {
  return {
    type: actionTypes.CREATE_PRODUCT_REQUEST_START,
    payload: {
      data,
    },
  };
}

function createProductResponse(data) {
  return {
    type: actionTypes.CREATE_PRODUCT_RESPONSE,
    payload: {
      data,
    },
  };
}

function updateProductRequest(data) {
  return {
    type: actionTypes.UPDATE_PRODUCT_REQUEST_START,
    payload: {
      data,
    },
  };
}

function updateProductResponse(data) {
  return {
    type: actionTypes.UPDATE_PRODUCT_RESPONSE,
    payload: {
      data,
    },
  };
}

function deleteProductRequest(id) {
  return {
    type: actionTypes.DELETE_PRODUCT_REQUEST_START,
    payload: {
      id,
    },
  };
}

function deleteProductResponse(data) {
  return {
    type: actionTypes.DELETE_PRODUCT_RESPONSE,
    payload: {
      data,
    },
  };
}

function clearProducts() {
  return {
    type: actionTypes.CLEAR_PRODUCTS,
  };
}

function clearSingleProduct() {
  return {
    type: actionTypes.CLEAR_SINGLE_PRODUCT,
  };
}

function handleError(error) {
  return {
    type: actionTypes.HANDLE_ERROR,
    payload: {
      error,
    },
  };
}

function clearError() {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
}


export {
  getProductsListRequest,
  getProductsListResponse,
  getSingleProductRequest,
  getSingleProductResponse,
  createProductRequest,
  createProductResponse,
  updateProductRequest,
  updateProductResponse,
  deleteProductRequest,
  deleteProductResponse,
  clearProducts,
  clearSingleProduct,
  handleError,
  clearError
};