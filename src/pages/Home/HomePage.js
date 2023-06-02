import './HomePage.scss';
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from '../NavBar/NavBar';
import SliderHome from '../Slider/Slider';
import Head from './header/Head';
import Search from './header/Search';





const HomePage = () => {

    return (
        <>
            {/* <NavBar /> */}
            <Head />
            <Search />
            {/* <div classname="row align-items-center py-3 px-xl-5 ">
                <div classname="col-lg-3 d-none d-lg-block">
                    <a href="" classname="text-decoration-none">
                        <h1 classname="m-0 display-5 font-weight-semi-bold"><span classname="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                    </a>
                </div>
                <div classname="col-lg-6 col-6 text-left">
                    <form action="">
                        <div classname="input-group">
                            <input type="text" classname="form-control" placeholder="Search for products" />
                            <div classname="input-group-append">
                                <span classname="input-group-text bg-transparent text-primary">
                                    <i classname="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
                <div classname="col-lg-3 col-6 text-right">
                    <a href="" classname="btn border">
                        <i classname="fas fa-heart text-primary"></i>
                        <span classname="badge">0</span>
                    </a>
                    <a href="" classname="btn border">
                        <i classname="fas fa-shopping-cart text-primary"></i>
                        <span classname="badge">0</span>
                    </a>
                </div>
            </div> */}
            <SliderHome />
        </>
    )
}

export default HomePage;