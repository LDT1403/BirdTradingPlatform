import React from "react";
import './Header.css';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Head = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <>
            <section className='head navbar navbar-expand-lg '>
                <div className='container px-3'>
                    <div className='left'>
                        <i className='fa fa-phone'></i>
                        <label> +84 397337051</label>
                        <i className='fa fa-envelope'></i>
                        <label> support@ui-lib.com</label>
                    </div>
                    <div className='right ms-auto '>

                        {/* <label>Theme FAQ's</label>
                        <label>Need Help?</label>
                        <span>🏳️‍⚧️</span>
                        <label>EN</label>
                        <span>🏳️‍⚧️</span>
                        <label>USD</label> */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <span>🏳️‍⚧️</span>
                            <label>EN</label>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                {/* <li className="nav-item"> <Link to="/" className="nav-link active" aria-current="page">Home</Link></li> */}
                                {user ? (
                                    <>
                                        <li className="nav-item "><span className="nav-link active"> {user.token} </span> </li>
                                        <li className="nav-item"><Link to="/logout" class="nav-link active" > Logout</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item"><Link to="/login" className="nav-link active text-white">Login</Link></li>
                                        {/* <li className="nav-item"><Link to="/register" class="nav-link active"> Register</Link></li> */}
                                    </>
                                )

                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Head;