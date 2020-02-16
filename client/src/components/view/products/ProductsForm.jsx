import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getSingleProduct, createProduct, updateProduct } from 'service/products.service';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { PRODUCT_ID_FIELD, CATEGORIES } from 'constants/constants';
import { clearSingleProduct } from 'reducers/products/actions';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withErrors from 'components/error/ErrorHandler';

const styles = (theme) => (
  {
    formControl: {
      margin: theme.spacing(1),
      minWidth: 195
    },
    submitButton: {
      marginTop: '25px'
    },
    backButton: {
      marginRight: '15px',
      marginTop: '25px'
    },
    buttons: {
      float: 'right'
    },
    title: {
      flex: '1 1 100%',
      paddingBottom: '25px'
    },
  });

const mapStateToProps = (state) => {
  return {
    initialValues: state.singleProduct
  };
};

const mapDispatchToProps = {
  getSingleProduct,
  createProduct,
  updateProduct,
  clearSingleProduct
};


class ProductsForm extends Component {
  static propTypes = {
    clearSingleProduct: PropTypes.func,
    getSingleProduct: PropTypes.func,
    createProduct: PropTypes.func,
    updateProduct: PropTypes.func,
    initialValues: PropTypes.object,
    classes: PropTypes.object
  };

  componentDidMount() {
    const productId = this._getProductId();
    if (productId) {
      this.props.getSingleProduct(productId);
    }
  }

  componentWillUnmount() {
    this.props.clearSingleProduct();
  }

  onSubmit = async (values) => {
    const productId = this._getProductId();

    if (!productId) {
      this.props.createProduct(values);
    } else {
      this.props.updateProduct(productId, values);
    }
  };

  _getProductId = () => this.props.match.params[PRODUCT_ID_FIELD];

  _fieldValidation = (value) => !value && value !== 0 ? 'Field is required' : undefined;

  _onBack = () => this.props.history.push('/products');

  _onCreateDateParse = (value) => value ? value.split(' ')[0] : '';

  render() {
    const { initialValues, classes } = this.props;
    const productId = this._getProductId();

    return (
      <Fragment>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Product Form
        </Typography>
        <Form
          onSubmit={this.onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {
                  productId ?
                    <Grid item xs={4}>
                      <Field
                        name="id"
                        component={TextField}
                        type="number"
                        label="ID"
                        disabled
                      />
                    </Grid> : null
                }
                <Grid item xs={4}>
                  <Field
                    name="title"
                    component={TextField}
                    type="text"
                    label="Title"
                    validate={this._fieldValidation}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    name="category"
                    component={Select}
                    label="Category"
                    formControlProps={{ className: classes.formControl }}
                    validate={this._fieldValidation}
                  >
                    {CATEGORIES.map(category => (
                      <MenuItem key={category.value} value={category.value}>{category.text}</MenuItem>))}
                  </Field>
                </Grid>
                <Grid item xs={4}>
                  <Field
                    name="quantity"
                    component={TextField}
                    type="number"
                    label="Quantity"
                    validate={this._fieldValidation}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    name="description"
                    component={TextField}
                    type="text"
                    label="Description"
                    validate={this._fieldValidation}
                  />
                </Grid>
                {
                  productId ?
                    <Grid item xs={4}>
                      <Field
                        name="createDate"
                        component={TextField}
                        type="text"
                        label="Create Date"
                        format={this._onCreateDateParse}
                        disabled
                      />
                    </Grid> : null
                }
              </Grid>
              <Grid item xs={12} className={classes.buttons}>
                <Button className={classes.backButton} variant="contained" color="primary" onClick={this._onBack}>
                  Back
                </Button>
                <Button className={classes.submitButton} variant="contained" color="primary" type="submit"
                        disabled={submitting || pristine}>
                  Submit
                </Button>
              </Grid>
            </form>
          )}
        />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withErrors(ProductsForm)));