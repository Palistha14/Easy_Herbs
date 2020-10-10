import React,{Component} from 'react';
import "../../assets/css/Navbar.scss"
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import * as actions from "../../store/actions/auth";
import logo from '../../assets/images/logo-black.png'
// import {useSelector} from 'react-redux'
import Product from "../../views/Product";
import Search from "../../views/SearchBox";
import cartIcon from "../../assets/images/shopping-cart.png";
import {Dropdown, Icon, Menu} from "antd";

class Navbar extends Component{
    menu = (
        <Menu>
            <Menu.Item>
                <Link to={"#"} onClick={this.props.logout}>Logout</Link>
            </Menu.Item>
        </Menu>
    );

    render() {
        let linksMarkup = this.props.links.map((link,index) => {
            return(
                <li className="nav__list-item" key={index}>
                    <Link className="nav__link" to={link.path}>{link.label}</Link>
                </li>
            );
        });

        return (

            <nav className="nav">
                <div style={{
                    // 'backgroundImage':'url('+ this.props.logo +')'
                }} className="nav__logo"><img src={logo} height='100%' width='100px'/></div>

                <div className="nav__right">
                    <div className="item-center">
                        <ul className="nav__list">
                            {linksMarkup}
                        </ul>
                        {/*{this.checkStatus()}*/}
                        <Product/>
                    </div>
                    {/*<div className="right-item">*/}
                    {/*    <Account/>*/}
                    {/*    <Search/>*/}
                    {/*</div>*/}
                    <div className={"nav-right-item"}>
                        <div className={"user-log"}>
                    {
                        this.props.isAuthenticated
                            ?
                            <ul className={"nav__list1"}>
                                <li className="nav__list-item">
                                    <Link className={"nav__link"} to={"/mycart"}>
                                        <Icon type="shopping-cart" />
                                    </Link>
                                </li>
                                <li className={'nav__list-item'}>
                                    <Dropdown overlay={this.menu}>
                                        <Link className={"nav__link"} to={"#"}>{this.props.username}<Icon type={"down"}/> </Link>
                                    </Dropdown>

                                </li>

                            </ul>
                            :
                            <ul className={"nav__list1"}>
                                <li className={"nav__list-item"}>
                                    <Link className={"nav__link"} to={"/login"}>Login</Link>
                                </li>
                                <li className={"nav__list-item"}>
                                    <Link className={"nav__link"} to={"/register"}>Register</Link>
                                </li>

                            </ul>
                    }
                        </div>
                    <Search/>
                    </div>
                </div>
            </nav>

        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.logged.token !== null,
        username: state.logged.username
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch(actions.logout())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
