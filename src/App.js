// import logo from './logo.svg';
import './App.css';
// import Login from './pages/Auth/Login/Login';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Register from './pages/Auth/Register/Register';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from './components/Layout/Layout';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";

import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
// import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import PrivateRouter from "./PrivateRouter";
import { listOrders } from './pages/redux/Actions/OrderActions';
import { useEffect } from 'react';
import { listProducts } from './pages/redux/Actions/ProductActions';
import UserScreen from './screenAdmin/UserScreen';
// import DashBoard from './screenAdmin/DashBoardScreen';
import ShopScreen from './screenAdmin/ShopScreen';
import DashBoardScreen from './screenAdmin/DashBoardScreen';
import { listShop, listUser } from './pages/redux/Actions/userActions';

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const shop = useSelector((state) => state.users.registerShop.currentShop);
  console.log(shop);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user.role === 'SP' || shop.roleId === "SP") {
      dispatch(listOrders());
      dispatch(listProducts());
    }
    if (user.role === 'AD') {
      dispatch(listShop());
      dispatch(listUser());
    }
  }, [dispatch]);
  return (
    <>

      <Layout />

      <Routes>
        {(user.role === 'SP' || shop.roleId === "SP") && (
          <>
            <Route path="/manageshop" element={<PrivateRouter component={HomeScreen} />} />
            <Route path="/products" element={<PrivateRouter component={ProductScreen} />} />
            <Route path="/category" element={<PrivateRouter component={CategoriesScreen} />} />
            <Route path="/orders" element={<PrivateRouter component={OrderScreen} />} />
            <Route path="/order/:id" element={<PrivateRouter component={OrderDetailScreen} />} />
            <Route path="/addproduct" element={<PrivateRouter component={AddProduct} />} />
            <Route path="/product/:id/edit" element={<PrivateRouter component={ProductEditScreen} />} />
          </>
        )}

        {
          user.role === 'AD' && (
            <>
              <Route path="/users" element={<UserScreen />} />
              <Route path="/dashboard" element={<DashBoardScreen />} />
              <Route path="/shops" element={<ShopScreen />} />
            </>
          )
        }



        {/* <Route path="*" element={<PrivateRouter component={NotFound} />} /> */}
      </Routes>
    </>
  );
}


export default App;
