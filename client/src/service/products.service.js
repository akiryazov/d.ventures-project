import {
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
  handleError
} from 'reducers/products/actions';
import ajaxService from 'service/ajax.service';
import { history } from 'util/routeHistory';

function getProducts(filters) {
  return (dispatch) => {
    fetchProductsList(dispatch, filters);
  };
}

function getSingleProduct(id) {
  return (dispatch) => {
    fetchProduct(dispatch, id);
  };
}

function createProduct(data) {
  return (dispatch) => {
    dispatch(createProductRequest(data));
    ajaxService.post('/products/create', data).then((response) => {
      if (response.status === 201) {
        dispatch(createProductResponse(response));
        history.push(`/products/${response.data.id}`);
      } else {
        dispatch(handleError(JSON.stringify(response.data.message)));
      }
    });
  };
}

function updateProduct(id, data) {
  return (dispatch) => {
    dispatch(updateProductRequest(data));
    ajaxService.put(`/products/${id}/update`, data).then((response) => {
      if (response.status === 200) {
        dispatch(updateProductResponse(response));
        fetchProduct(dispatch, id);
      } else {
        dispatch(handleError(JSON.stringify(response.data.message)));
      }
    });
  };
}

function deleteProduct(id) {
  return (dispatch) => {
    dispatch(deleteProductRequest(id));
    ajaxService.deleteEntity(`/products/${id}/delete`).then((response) => {
      if (response.status === 200) {
        dispatch(deleteProductResponse(response));
        fetchProductsList(dispatch, {});
      } else {
        dispatch(handleError(JSON.stringify(response.data.message)));
      }
    });
  };

}

function fetchProduct(dispatch, id) {
  dispatch(getSingleProductRequest(id));
  ajaxService.get(`/products/${id}`).then((response) => {
    if (response.status === 200) {
      dispatch(getSingleProductResponse(response.data));
    } else {
      dispatch(handleError(JSON.stringify(response.data.message)));
    }
  });
}

function fetchProductsList(dispatch, filters) {
  const queryParams = Object.keys(filters).length ? '?' + Object.keys(filters).filter(key => filters[key]).map(key => key + '=' + filters[key]).join('&') : '';

  dispatch(getProductsListRequest());
  ajaxService.get(`/products${queryParams}`).then((response) => {
    if (response.status === 200) {
      dispatch(getProductsListResponse(response.data));
    } else {
      dispatch(handleError(JSON.stringify(response.data.message)));
    }
  });
}

export {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
};