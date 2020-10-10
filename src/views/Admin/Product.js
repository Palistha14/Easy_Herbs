import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AdminProductCard from "../../components/Admin/Product";
import {Skeleton} from "antd";
import axios from "axios";


class Product extends Component {
    state = {
        productData:[],
        loadProduct:false,
    }
    componentDidMount() {
        axios.get(`http://localhost:8000/api/manageo/?ordering=-requestNo`)
            .then(res=>{
                res.data.map(item=>{
                    axios.get(`http://localhost:8000/api/products/${item.productId}/`)
                        .then(res=>{
                            let itemInfo = res.data
                            let obj = {
                                "id": item.productId,
                                "name": itemInfo.name,
                                "image": itemInfo.image,
                                "inventory":item.inventory,
                                "safetyStock":item.safetyStock,
                                "tag": item.inventory> item.safetyStock ? "available" : "understock"
                            }
                            this.state.productData.push(obj)
                            console.log(obj)
                            this.setState({
                                loadProduct: true
                            })
                        })
                })
            })
    }

    render() {
        return (
            <main style={{display:"flex",flexFlow:"column"}}>
                <h3>Products</h3>
                <div
                    className="product-list-admin"
                    style={{
                        width:"100%",
                        display:"flex",
                        marginTop:"-10px",
                        justifyContent:"space-between",
                        flexWrap:"wrap"
                    }}>
                    {
                        this.state.loadProduct
                            ?
                            this.state.productData.map((product,key)=>(
                                <AdminProductCard index={key} key={key} product={product}/>
                            ))
                            :
                            <Skeleton active />
                    }
                </div>
                <div style={{position:"absolute", right:"10px", bottom:"10px"}}>
                <Fab color="primary" aria-label="add" onClick={()=>{window.location="/admin/add_product"}}>
                    <AddIcon />
                </Fab>
                </div>
            </main>
        );
    }
}

export default Product;