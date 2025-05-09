import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { createHashRouter, RouterProvider } from 'react-router';

import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Admin from './pages/Admin.jsx';
import Login from './pages/Login.jsx';
import EditProduct from './pages/EditProduct.jsx';
import AddProduct from './pages/AddProduct.jsx';
import ProductPage from './pages/ProductPage';

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
        Component: Admin
      },
      {
        path: 'login',
        Component: Login
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
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
