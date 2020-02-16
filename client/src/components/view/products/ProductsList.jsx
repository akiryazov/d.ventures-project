import React, { Component } from 'react';
import Table from 'widgets/table/Table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProducts, deleteProduct } from 'service/products.service';
import { clearProducts } from 'reducers/products/actions';
import { PRODUCT_ID_FIELD, CATEGORIES } from 'constants/constants';
import DeleteIcon from '@material-ui/icons/Delete';
import withErrors from 'components/error/ErrorHandler';

const mapStateToProps = (state) => {
  return {
    products: state.productsList,
  };
};

const mapDispatchToProps = {
  getProducts,
  clearProducts,
  deleteProduct,
};

class ProductsList extends Component {
  static propTypes = {
    products: PropTypes.array,
    getProducts: PropTypes.func,
    history: PropTypes.object,
    clearProducts: PropTypes.func,
    deleteProduct: PropTypes.func,
  };

  componentDidMount() {
    this.props.getProducts({});
  }

  componentWillUnmount() {
    this.props.clearProducts();
  }

  onSearch = (filters) => {
    this.props.getProducts(filters);
  };

  onCreate = () => {
    const { history } = this.props;
    history.push('/products/create');
  };

  onRowClick = (row) => {
    const { history } = this.props;
    history.push(`/products/${row[PRODUCT_ID_FIELD]}`);
  };

  onDelete = (selectedRows) => {
    this.props.deleteProduct(selectedRows[0]);
  };

  _getCategoriesMap = () => {
    return CATEGORIES.reduce((obj, item) => ({ ...obj, [item.value]: item.text }), {});
  };

  render() {
    const { products } = this.props;
    const categoriesMap = this._getCategoriesMap();

    return <Table
      data={products}
      onRowClick={this.onRowClick}
      onCreate={this.onCreate}
      idField={PRODUCT_ID_FIELD}
      title={'Products List'}
      selectable={true}
      onSearch={this.onSearch}
      actions={[
        {
          id: 'delete',
          title: 'Delete',
          onClick: this.onDelete,
          icon: <DeleteIcon/>,
        },
      ]}
      columns={[
        {
          id: 'id',
          label: 'ID',
        },
        {
          id: 'title',
          label: 'Title',
        },
        {
          id: 'category',
          label: 'Category',
          cell: (value) => categoriesMap[value],
        },
        {
          id: 'quantity',
          label: 'Quantity',
        },
        {
          id: 'description',
          label: 'Description',
        },
        {
          id: 'createDate',
          label: 'Create Date',
          cell: (value) => value.split(' ')[0],
        },
      ]}
      filters={[
        { id: 'id', label: 'Product ID', type: 'number' },
        { id: 'title', label: 'Title', type: 'text' },
        {
          id: 'category', label: 'Category', type: 'select',
          options: [
            { text: 'All', value: '' },
            { text: 'Technology', value: '0' },
            { text: 'Groceries', value: '1' },
            { text: 'Healthcare', value: '2' },
            { text: 'Clothing', value: '3' },
            { text: 'Animal', value: '4' },
            { text: 'Other', value: '5' },
          ],
          defaultValue: '',
        },
        { id: 'quantity', label: 'Quantity', type: 'number' },
        { id: 'description', label: 'Description', type: 'text' },
        { id: 'createDate', label: 'Create Date', type: 'date' },
      ]}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrors(ProductsList));