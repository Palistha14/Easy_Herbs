import React, {Component} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import 'antd/dist/antd.css';
import Layout from "./views/Layout/Layout";
import {connect} from "react-redux";
import * as actions from "./store/actions/auth"
// import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import {useSelector} from 'react-redux';
import AdminLayout from "./views/Layout/AdminLayout";
import TopNavbar from "./containers/TopNavbar/TopNavbar";
import AddProduct from "./components/Admin/AddProduct";

class App extends Component{
    state = {
        admin: false
    }
    componentDidMount() {
        this.props.onTryAutoSignup();

    }

    render() {
        // console.log(localStorage);
        /*window.onbeforeunload = function() {
            return "Data will be lost if you leave the page, are you sure?";
        };*/
        return (
            <div className="App">
                {
                    this.props.isAdmin ? <AdminLayout/> : <Layout/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAdmin: state.logged.status
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup : () => dispatch(actions.authCheckState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
