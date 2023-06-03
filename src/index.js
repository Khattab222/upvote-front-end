import React from 'react';
import ReactDOM from 'react-dom/client';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AnimatePresence } from 'framer-motion';







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
   <ToastContainer theme='dark'/>

   <Provider store={store}>
    <App />
    </Provider>
   

  </>
);


