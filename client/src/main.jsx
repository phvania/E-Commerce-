import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Contact from './pages/Contact';
import Sales from './pages/Sales';
import Search from './pages/Search';
import Cart from './pages/Cart';
import ViewOrders from './pages/ViewOrders';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/success',
        element: <Success />
      }, {
        path: '/orderHistory',
        element: <OrderHistory />
      },
      {
        path: '/viewOrders',
        element: <ViewOrders/>
      }, {
        path: '/products/:id',
        element: <Detail />
      }, {
        path: '/contact',
        element: <Contact />
      }, {
        path: '/sales',
        element: <Sales />
      }, {
        path: '/search',
        element: <Search />
      }, {
        path: '/cart/:id',
        element: <Cart />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
