import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Responsive.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import HttpsRedirect from 'react-https-redirect'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import AboutUs from './Components/AboutUs';
import Category from './Components/Category';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: '/about',
        element: <AboutUs/>
      },
      {
        path: '/category',
        element: <Category/>
      }
      
    ]
  },
]) 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HttpsRedirect>
      <RouterProvider router={router}/>
    </HttpsRedirect>
  </React.StrictMode>
);

