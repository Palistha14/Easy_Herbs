import React, {Component} from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import {Link} from 'react-router-dom'

const menu = (
    <Menu>
        <Menu.Item>
            <Link to={"/category/1"}>Health & Beauty</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to={"/category/2"}>Health Supplements</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to={"/category/3"}>Herbal Products</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to={"/category/5"}>Tea & Coffee</Link>
        </Menu.Item>
    </Menu>
);

class Product extends Component {
    render(){
        return(
        <Dropdown overlay={menu}>
            <Link className="nav__link" to="#">Product <Icon type="down"/>
            </Link>
        </Dropdown>

        );
    }

}


export default Product;