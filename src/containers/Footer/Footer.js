import React, { Component } from 'react';
import '../../assets/css/footer.css';
// import logo from '../../logo.svg';
import logo1 from '../../assets/images/logo-white.png'

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="layout">
                    <div className="footer-wrapper clearfix">
                        <div className="grid-3 footer-logo">
                            <a href="/">
                                <img alt="Can't display" src={logo1} height={'250px'} weight={'250px'}/>
                            </a>
                            <p className="footer-text">
                                Herbal products are medicines derived from plants.
                                They are used as supplements to improve health and well being, and may be used for other therapeutic purposes.
                                Herbal products are available as tablets, capsules, powders, extracts, teas and so on.
                            </p>
                        </div>
                        <div className="grid-3">
                            <p className="footer-heading">link</p>
                            <ul className="footermenu">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/Product">Product</a>
                                </li>
                                <li>
                                    <a href="/Login">Login</a>
                                </li>
                                <li>
                                    <a href="/Register">Register</a>
                                </li>
                            </ul>
                        </div>
                        <div className="grid-3">
                            <p className="footer-heading">Contact</p>
                            <ul className="footer-contact">
                                <li>
                                    <i className="fa fa-home"></i>
                                    <span>Address:</span> Paknajol, kathmandu
                                </li>
                                <li>
                                    <i className="fa fa-phone"></i>
                                    <span>Phone:</span>{' '}
                                    <a href="tel:88%2002%208714612">+91 8173096601</a>
                                </li>
                                <li>
                                    <i className="fa fa-envelope-o"></i>
                                    <span>E-mail:</span>{' '}
                                    <a href="mailto:caroze20@gmail.com">easyherbs@gmail.com</a>
                                </li>
                                <li>
                                    <i className="fa fa-chrome"></i>
                                    <span>web:</span>{' '}
                                    <a href="http://www.easyherbs.com">www.easyherbs.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;