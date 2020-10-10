import React, {Component} from 'react';
import axios from "axios";
import ManageCart from "../components/Cart/ManageCart/ManageCart";
import ProductCartList from "../components/ProductCartList/ProductCartList";

class Product_Detail extends Component {
    state = {
        product: {}
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get('http://127.0.0.1:8000/api/products/'+id).then((res)=>{
                console.log(res);
                this.setState({
                    product:res.data
                })
            });
    }

    render() {
        return (
            <div>
                <div>
                    <img src={this.state.product.image} alt=""/>
                </div>
                <div>
                    <h3>{this.state.product.name}</h3>
                    <h5>${this.state.product.price}</h5>
                    <h5>{this.state.product.description}</h5>
                </div>
                <div>
                    <form action={ProductCartList}>
                        <button type="submit" >Add to cart</button>
                    </form>
                </div>
                <ManageCart/>
            </div>
        );
    }
}

export default Product_Detail;