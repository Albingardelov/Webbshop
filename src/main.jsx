import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { createHashRouter, RouterProvider } from 'react-router';

import Home from './pages/Home.jsx';
import Cart from './components/Cart/Cart.jsx';
import Admin from './pages/Admin.jsx';
import Login, { AdminProtected } from './pages/Login.jsx';
import EditProduct from './pages/EditProduct.jsx';
import AddProduct from './pages/AddProduct.jsx';
import ProductPage from './pages/ProductPage';
import ProductDetails from './pages/ProductDetails';
import CheckoutThankYou from './pages/CheckoutThankYou.jsx';
import CheckoutForm from './pages/CheckoutForm.jsx';

const router = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'cart',
        Component: Cart
      },
      {
        path: 'admin',
        Component: AdminProtected
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'admin/edit',
        Component: EditProduct
      },
      {
        path: 'admin/edit/:id',
        Component: EditProduct
      },
      {
        path: 'admin/add',
        Component: AddProduct
      },
      {
        path: 'category/:category',
        Component: ProductPage
      },
      {
        path: 'product/:id',
        Component: ProductDetails
      },
      {
        path: 'checkout',
        Component: CheckoutForm
      },
      {
        path: 'thankyou',
        Component: CheckoutThankYou
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
