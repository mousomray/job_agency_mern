import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Auth/authslice';

const Navbar = () => {

    const dispatch = useDispatch();
    const { Logouttoggle } = useSelector((state) => state?.Auth);
    const name = localStorage.getItem("name");
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/signin")
    }

    return (
        <>
            <header class="header-area header-sticky">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <nav class="main-nav">
                                {/* <!-- ***** Logo Start ***** --> */}
                                <a href="index.html" class="logo">Job<em>Agency</em></a>
                                {/* <!-- ***** Logo End ***** -->
                                <!-- ***** Menu Start ***** --> */}
                                <ul class="nav">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/team">Team</Link></li>
                                    <li><a href="http://localhost:3004/employer/login">Become a employer</a></li>
                                    {Logouttoggle ? (
                                        <>
                                            <li class="dropdown">
                                                <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                                                    aria-haspopup="true" aria-expanded="false">{name}</a>
                                                <div class="dropdown-menu">
                                                    <Link class="dropdown-item" to='/dashboard'>Dashboard</Link>
                                                    <Link class="dropdown-item" to='/updatepassword'>Updatepassword</Link>
                                                    <a class="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
                                                </div>
                                            </li>
                                        </>
                                    ) : (
                                        <li><a href="/signin">Signin</a></li>
                                    )}
                                </ul>
                                <a class='menu-trigger'>
                                    <span>Menu</span>
                                </a>
                                {/* <!-- ***** Menu End ***** --> */}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
