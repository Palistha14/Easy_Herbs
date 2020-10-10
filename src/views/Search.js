import React, {Component} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard/ProductCard";
import {Spin} from "antd";

class Search extends Component {
    state={
        productList:[],
        loadData:false,
        error:false
    };

    componentDidMount() {
        let key = this.props.match.params.key;
        axios.get(`http://localhost:8000/api/product_search/?search=${key}`)
            .then(res=>{
                this.setState({
                    productList: res.data,
                    loadData: true,
                })
                console.log(this.state.productList)
            })
    }

    render() {
        return (
            <div className={"home-style"}>
                <h3>Search Results</h3>
                <div className="product-list">
                    {this.state.loadData ?
                        this.state.productList.map((product,key)=>(
                            <ProductCard index={key} key={key} product={product}/>
                        ))
                        :
                        <Spin/>
                    }
                </div>
            </div>
        );
    }
}

export default Search;