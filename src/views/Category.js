import React, {Component} from 'react';
import axios from 'axios'
import {Spin} from "antd";
import ProductCard from "../components/ProductCard/ProductCard";

class Category extends Component {
    state={
        name:null,
        loadName:false,
        productList:[],
        loadData:false,
        error:false
    }

    componentDidMount() {
        let id = this.props.match.params.id
        // console.log(id)
        axios.get(`http://localhost:8000/api/category/${id}/`)
        .then(res=>{
            this.setState({
                name: res.data.name,
                loadName: true
            })
        })
        .catch(err=>{
            this.setState({
                error: true
            })
        })
        axios.get(`http://localhost:8000/api/products/?category=${id}`)
        .then(res=>{
            this.setState({
                productList: res.data,
                loadData: true,
            })
        })
    }

    render() {
        return (
            <div style={{
                marginTop: '80px',
                textAlign: 'center'
            }}>
                <span>
                    {this.state.loadName ?
                        <h3>{this.state.name}</h3>
                        :
                        <Spin/>
                    }
                </span>
                <div style={{marginTop: '-15px'}} className="product-list">
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

export default Category;