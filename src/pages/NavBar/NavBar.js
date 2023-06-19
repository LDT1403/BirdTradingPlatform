// import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark text-white">
            <div className="container px-5">
                <a className="navbar-brand" href="/">BiTrap</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"> <Link to="/" className="nav-link active" aria-current="page">Home</Link></li>
                        {user ? (
                            <>
                                <li className="nav-item"><span className="nav-link active"> {user.token} </span> </li>
                                <li className="nav-item"><Link to="/logout" className="nav-link active" > Logout</Link></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link to="/login" className="nav-link active">Login</Link></li>
                                <li className="nav-item"><Link to="/register" className="nav-link active"> Register</Link></li>
                            </>
                        )

                        }

                    </ul>
                </div>
            </div>
        </nav>
        // <nav className="navbar-container">
        //     <Link to="/" className="navbar-home"> Home </Link>
        //     {user ? (
        //         <>
        //             <p className="navbar-user">Hi, <span> {user.token}  </span> </p>
        //             <Link to="/logout" className="navbar-logout"> Log out</Link>
        //         </>
        //     ) : (
        //         <>
        //             <Link to="/login" className="navbar-login"> Login </Link>
        //             <Link to="/register" className="navbar-register"> Register</Link>
        //         </>
        //     )}
        // </nav>
    )
}
export default NavBar;