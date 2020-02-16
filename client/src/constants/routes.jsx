import ProductsList from 'components/view/products/ProductsList';
import ProductsForm from 'components/view/products/ProductsForm';
import Home from 'components/view/home/Home';

const routes = [
  { path: '/', name: 'Home', component: Home, exact: true, sideNav: true },
  { path: '/products/create', name: 'Create Product', component: ProductsForm },
  { path: '/products/:id', name: 'Edit Product', component: ProductsForm },
  { path: '/products', name: 'Products', component: ProductsList, sideNav: true }
];

export default routes;