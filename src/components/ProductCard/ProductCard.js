import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AddToCart from '../Cart/AddToCart/AddToCart';
import "../../assets/css/ProductCard.scss";
import {connect} from "react-redux";

class ProductCard extends React.Component{
    state={
        i:true
    };
    // handleClick=()=>{
    //     <AddToCart info = {this.props.product}/>
    // }
    render() {
        return (
            <div className="main-card">
                <div className="product-card">
                    <div className="product-detail name">{this.props.product.name}</div>
                    <div className="product-detail image-box">
                        <img src={this.props.product.image} alt="" className={"image"} height={'300px'} weight={'300px'}/>
                    </div>
                    <div className="product-detail">Price ${this.props.product.price}</div>
                    <div id={`des${this.props.index}`} className="description des-less product-detail">{this.props.product.description}</div>

                </div>
                <div className="button-card">
                    <div className="view-more">
                    <button className={"view"} onClick={()=>{
                        document.querySelector("#des"+this.props.index).classList.toggle("des-less");
                        document.querySelector("#des"+this.props.index).classList.toggle("des-more");
                        this.setState({
                            i: !this.state.i
                        })
                    }}>
                        { this.state.i % 2 ? "View More" : "View Less" }
                    </button>
                    </div>
                    {/*<AddToCart info = {this.props.product}/>*/}
                    {
                        this.props.isAuthenticated
                        ?
                            <AddToCart info = {this.props.product}/>
                        :
                        ""
                    }
                </div>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.logged.token !== null
    }
};


export default connect(mapStateToProps, null)(ProductCard);