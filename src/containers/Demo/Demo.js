import React, { Component } from "react";
import axios from "axios";

class Demo extends Component{
    state={
        products:[],
    };

    componentDidMount() {
        axios.get('http://localhost:8000/api/items/')
            .then(res=>{
            console.log(res.data);
            this.state.products.push(res.data);
            this.setState({
                products:res.data
            })
        })
    }

    render(){
        return(
            <div>
            {this.state.products.map((product,key)=>(
                    <div>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <img src={product.image} alt=""/>
                    </div>
                ))}
            </div>
        )
    }
}

export default Demo