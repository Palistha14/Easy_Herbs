import React,{Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import logo from '../../assets/images/logo-black.png';
import Home from "../Home";
import Search from "../SearchBox";
// import Movies from "../../components/Movies/Movies";
import * as route from "../../AppRouter";
import Navbar from "../../containers/Navbar/Navbar";
import Slideshow from "../../components/Slideshow";
import * as actions from "../../store/actions/auth";
import {connect} from "react-redux";
import Footer from "../../containers/Footer/Footer";


class Layout extends Component{
    state={
        links:[
            {id:1, label:'Home', path:'/Home', props:{...this.props}},
        ],
    };
    render(){


        // let navItems=['Home', 'About', 'Search','Settings'];
        return(
            <div>
            <div className="container center">
                <BrowserRouter >
                    <Navbar links ={this.state.links} logo={logo} {...this.props}/>
                    <Switch>
                        {route.route_user.map((route,key)=>(
                            <Route key={key} path={route.path} component={route.component} exact={route.exact}/>
                        ))}
                    </Switch>

                </BrowserRouter>
            </div>
                {/*<Footer/>*/}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.logged.token !== null
    }
};


export default connect(mapStateToProps, null)(Layout);
