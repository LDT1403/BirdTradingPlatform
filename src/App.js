// import logo from './logo.svg';
// import './App.css';
import Login from './pages/Auth/Login/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './pages/Auth/Register/Register';
import HomePage from './pages/Home/HomePage';
import NavBar from './pages/NavBar/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          {/* <NavBar /> */}
          <div className="App">

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </header>
    </div>
  );
}

export default App;
