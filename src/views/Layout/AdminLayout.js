import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import * as route from "../../AppRouter"
import "../../assets/scss/Adminlayout.scss"
import Logo from "../../components/Logo/Logo";
import * as actions from "../../store/actions/auth";
import {connect} from "react-redux";
import logo1 from "../../assets/images/logo-white.png";

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };

    componentDidMount() {
        console.log(this.props.isAdmin)
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" style={{color: "white"}}>
                        <img src={logo1} height='100%' width='120px'/>
                    </div>

                    <BrowserRouter>
                        <Menu theme="dark" mode="inline">
                            <Menu.Item key="1">
                                <Icon type="dashboard"/>
                                <span>Dashboard</span><a href={"/admin/"}></a>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="inbox"/>
                                <span>Product</span><a href={"/admin/product/"}></a>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="plus-circle"/>
                                <span>Restock</span><a href="/admin/restock/"></a>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="transaction"/>
                                <span>Transaction</span><a href="/admin/transaction/"></a>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="snippets"/>
                                <span>Order</span><a href="/admin/order/"></a>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Icon type="logout"/>
                                <span onClick={this.props.logout}>Logout</span>
                            </Menu.Item>
                        </Menu>
                    </BrowserRouter>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                            overflow: "scroll"
                        }}
                    >
                        <BrowserRouter>
                            <Switch>
                                {route.route_admin.map((route, key) => (
                                    <Route path={route.path} component={route.component} exact={route.exact}/>
                                ))}
                            </Switch>
                        </BrowserRouter>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

// ReactDOM.render(<SiderDemo />, mountNode);
const mapStateToProps = state => {
    return {
        isAdmin: state.logged.status
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch(actions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SiderDemo);