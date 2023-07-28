import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

// import store from './pages/redux/store';
// import store from './pages/redux/store';
import ScrollToTop from './routes/ScrollToTop';
// import store from './store/store';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './pages/redux/store';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ScrollToTop />
      </PersistGate>
    </Provider>
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
    />
  
    <ToastContainer />

  </Router>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
