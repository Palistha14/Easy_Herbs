import React, {Component} from 'react';
import BarPieChart from "../../components/Admin/Charts/BarPieChart";
import axios from "axios";
import {Spin, Skeleton} from "antd";
import moment from "moment";
import TransactionTable from "../../components/Admin/TransactionTable";
import OrderTable from "../../components/Admin/OrderTable";
import ProductImg from "../../components/ProductImg/ProductImg";
import ProductCard from "../../components/ProductCard/ProductCard";
import AdminProductCard from "../../components/Admin/Product";

class Dashboard extends Component {

    state = {
        data1:[],
        loadBar:false,
        data2:[],
        data3:[],
        loadCheck:false,
        loadOrder:false,
        loadTransaction:false,
        productData:[],
        underStock:[],
        loadProduct:false,
        loadUnderStock:false,

    };



    componentDidMount() {
        let categories, products, orders;
        axios.get('http://localhost:8000/api/category/')
            .then(res=> {
                categories = res.data
                axios.get('http://localhost:8000/api/products/')
                    .then(res => {
                        products = res.data
                        axios.get("http://localhost:8000/api/order/")
                            .then(res => {
                                orders = res.data

                                categories.map(category => {
                                    let catObj = {'category': '', 'pie': [], 'sales': 0};
                                    catObj.category = category.name
                                    catObj.pie = []
                                    let filteredPrd = products.filter(product => {
                                        return product.category === category.id
                                    })
                                    let totalQuantity = 0;
                                    let prdObj = {'title': '', 'value': 0}

                                    filteredPrd.map(product => {
                                        let fileredOrd = orders.filter(order => {
                                            return product.id === order.productId
                                        })
                                        let quantity = 0
                                        fileredOrd.map(order => {
                                            quantity += order.quantity
                                        })
                                        prdObj.value = quantity
                                        prdObj.title = product.name
                                        totalQuantity += quantity
                                        catObj.pie.push(prdObj)
                                    })
                                    catObj.sales = totalQuantity
                                    this.state.data1.push(catObj)
                                })
                                // console.log(this.state.data1)
                                this.setState({
                                    loadBar:true
                                })
                            })
                    })
            })


        axios.get("http://localhost:8000/api/checkin/")
            .then(res => {
                // console.log(res.data)
                let check = res.data
                check.map(checks => {
                    let obj = {"id": null, "quantity": null, "date": null, "tags": null}
                    obj.id = checks.productId
                    obj.quantity = checks.quantity
                    obj.date = moment(checks.checkInDate).format('MMM DD, YYYY')
                    obj.tags = ["checkin",]
                    obj.order = checks.checkInDate
                    // console.log(obj)
                    this.state.data2.push(obj)
                    this.setState({
                        loadCheck: true
                    })
                })
            })
        axios.get("http://localhost:8000/api/order/")
            .then(res => {
                let ord = res.data
                ord.map(order => {
                    if (order.status) {
                        let obj = {"id": null, "quantity": null, "date": null, "tags": null}
                        obj.id = order.productId
                        obj.quantity = order.quantity
                        obj.date = moment(order.shippedDate).format('MMM DD, YYYY')
                        obj.tags = ["shipped",]
                        obj.order = order.shippedDate
                        this.state.data2.push(obj)
                    }else{
                        this.state.data3.push(order)
                    }
                })
                this.setState({
                    loadOrder:true
                })
            })

        axios.get(`http://localhost:8000/api/manageo/?ordering=-requestNo`)
        .then(res=>{
            // console.log(res.data)
            let understockData = res.data.filter(item=>{
                return item.inventory <= item.safetyStock
            });
            for(let i = 0; i<=2; i++){
                if(understockData[i]===undefined)
                    break
                axios.get(`http://localhost:8000/api/products/?id=${understockData[i].productId}`)
                    .then(res => {
                        let itemInfo = res.data[0]
                        let obj = {
                            "id": understockData[i].productId,
                            "name": itemInfo.name,
                            "image": itemInfo.image,
                            "inventory": understockData[i].inventory,
                            "safetyStock": understockData[i].safetyStock,
                            "tag": understockData[i].inventory > understockData[i].safetyStock ? "available" : "understock"
                        }
                        this.state.underStock.push(obj)
                    })
            }

            for(let i = 0; i<=2; i++){
                axios.get(`http://localhost:8000/api/products/?id=${res.data[i].productId}`)
                    .then(res1 => {
                        let itemInfo = res1.data[0]
                        let obj = {
                            "id": res.data[i].productId,
                            "name": itemInfo.name,
                            "image": itemInfo.image,
                            "inventory": res.data[i].inventory,
                            "safetyStock": res.data[i].safetyStock,
                            "tag": res.data[i].inventory > res.data[i].safetyStock ? "available" : "understock"
                        }
                        this.state.productData.push(obj)
                    })
            }
            this.setState({
                loadProduct: true
            })
        })
    }

    render() {
        if (this.state.loadCheck || this.state.loadOrder) {
            this.state.data2.sort((a, b) => (a.order < b.order) ? 1 : -1)
            this.state.data2.map(obj=>{
                if (this.state.data2.length>5)
                    this.state.data2.pop()
            })
            this.state.loadTransaction = true
        }
        if(this.state.loadOrder){
            this.state.data3.map(obj=>{
                if (this.state.data3.length>5)
                    this.state.data3.pop()
            })
        }
        return (
            <main style={{display:"flex",flexFlow:"column"}}>
                <h3>Current Inventories</h3>
                {this.state.loadBar ?
                    <BarPieChart data={this.state.data1}/>
                    :
                    <div className={"spinner"}>
                    <Spin />
                    </div>
                }
                <div className="dash-bottom">
                    <h5>UnderStock Products</h5>
                    <div
                        className="product-list-admin"
                        style={{
                            width:"100%",
                            display:"flex",
                            justifyContent:"space-between"
                        }}>
                        {
                            // this.state.loadProduct
                            //     ?
                                this.state.underStock.map((product,key)=>(
                                    <AdminProductCard index={key} key={key} product={product}/>
                                ))
                                // :
                                // <Skeleton active />
                        }
                    </div>
                </div>
                <div className="bottom">
                    <div className="transaction-table">
                        <h5>Transaction History</h5>
                    {
                        this.state.loadTransaction
                            ?
                            <TransactionTable data={this.state.data2}/>
                            :
                            <div className={"spinner"}>
                                <Spin />
                            </div>
                    }
                    </div>
                    <div className="order-table">
                        <h5>Orders Pending</h5>
                        {
                            this.state.loadOrder
                            ?
                            <OrderTable data = {this.state.data3}/>
                            :
                            <div className={"spinner"}>
                                <Spin />
                            </div>
                        }
                    </div>
                </div>
                <div className="dash-bottom">
                    <h5>Popular Products</h5>
                    <div
                        className="product-list-admin"
                        style={{
                            width:"100%",
                            display:"flex",
                            justifyContent:"space-between"
                        }}>
                    {
                        // this.state.loadProduct
                        // ?
                        this.state.productData.map((product,key)=>(
                                <AdminProductCard index={key} key={key} product={product}/>
                            ))
                        // :
                        // <Skeleton active />
                    }
                    </div>
                </div>
            </main>
        );
    }
}


export default Dashboard;