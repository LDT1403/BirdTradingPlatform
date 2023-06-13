// import logo from './logo.svg';
// import './App.css';
// import Login from './pages/Auth/Login/Login';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Register from './pages/Auth/Register/Register';


import Layout from './components/Layout/Layout';


function App() {
  return (
    <>
      <Layout />
      {/* <ToastContainer
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
      /> */}
    </>

    // <div className="App">
    //   <header className="App-header">
    //     <Router>
    //       {/* <NavBar /> */}
    //       <div className="App">

    //         <Routes>
    //           <Route path="/login" element={<Login />} />
    //           <Route path="/" element={<HomePage />} />
    //           <Route path="/register" element={<Register />} />
    //         </Routes>
    //       </div>
    //     </Router>

    //     <ToastContainer
    //       position="top-right"
    //       autoClose={5000}
    //       hideProgressBar={false}
    //       newestOnTop={false}
    //       closeOnClick
    //       rtl={false}
    //       pauseOnFocusLoss
    //       draggable
    //       pauseOnHover
    //       theme="light"
    //     />

    //   </header>
    // </div>
  );
}

export default App;
