import React, {Component} from 'react';
import ProductCard from "../ProductCard/ProductCard";
import axios from 'axios';
import s from "../../assets/images/z.jpg";

class ProductImg extends Component {
    state = {
        products: [
            {id: 1, name: 'Green Tea', category:'hawa', description:'aaaaaaaaaaaaaaaaaaa', price:'12', image: s},
            {id: 2, name: 'red tea', category:'aakaash', description:'bbbbbbbbbbb', price:'23', image: s},
            {id: 3, name: 'Bottle', category:'pani', description:'cccccccccccccccccccccc', price:'21', image: s},
            {id: 4, name: 'Black tea', category:'aago', description:'dddddddddddddddddddd', price:'32', image: s},
            {id: 5, name: 'Soap', category:'dharti', description:'eeeeeeeeeeeeeeeeeeeeeeee', price:'22', image: s},
            {id: 6, name: 'Shampoo', category:'bijuli', description:'hcjdaschdajkhcjdhckkjd', price:'14', image: s},

        ]
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/products/').then(res=>{
            // console.log(res.data);
            this.state.products.push(res.data);
            this.setState({
                products:res.data
            })
        })
    }
    render() {
        return (
            <div className="product-list">
                {this.state.products.map((product,key)=>(
                    <ProductCard index={key} key={key} product={product}/>
                ))}
            </div>
        );
    }
}
export default ProductImg;
