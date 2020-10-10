import React, {Component} from 'react';
// import AddToCart from '../Cart/AddToCart/AddToCart';
import "../../assets/css/ProductCard.scss";
import { Tag } from 'antd';
import {Link} from "react-router-dom";

class AdminProductCard extends React.Component {
    state={
        i:true
    };

    render() {
        return (
            <div className="main-card">
                <div className="product-card">
                    <div className="product-detail name">{this.props.product.name}</div>
                    <div className="product-detail image-box">
                        <img src={this.props.product.image} alt="" className={"image"} />
                    </div>

                    <div className="product-detail sign">
                        <Tag color={this.props.product.tag=="available"?"green":"volcano"} className={"tag"}>{this.props.product.tag.toUpperCase()}</Tag>
                    </div>
                </div>

                <div className="button-card">
                    <div className="view-more">
                        <Link to={"/admin/product_detail/"+this.props.product.id}><button className={"view"} >View more
                        </button></Link>
                    </div>
                    <div className="add-cart">
                        <button className={"edit"}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default AdminProductCard;