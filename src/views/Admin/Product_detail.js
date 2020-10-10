import React, {Component} from 'react';
import axios from "axios";
import DonutChart from "../../components/Admin/Charts/DonutChart";
import ColumnLineChart from "../../components/Admin/Charts/ColumnLineChart";
import moment from "moment";
import {Spin} from "antd";

class ProductDetail extends Component {
    state={
        id: this.props.match.params.id,
        loadDonut : false,
        loadColumn: false,
        loadEOQ: false,
        okEOQ:false,
        avg:0,
        data:{
            donut:{
                purchase:null,
                sells:null,
                curStock:null,
                preStock:null
            },
            column:{
                checkIn:[],
                checkOut:[],
                avgDemand:null,
                eoq:null
            }
        }
    };

    average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    getEOQ(avg) {


    }
    componentDidMount() {
        let d = Date.now()-5*30*24*60*60*1000;
        for(let i = d; i<Date.now(); i+=30*24*60*60*1000){
            let key = moment(i).format(`MMM, YYYY`)
            this.state.data.column.checkIn[key] = 0
            this.state.data.column.checkOut[key] = 0
        }
        let dateg = moment(d).format(`YYYY-MM-${1}`);
        let datel = moment(Date.now()).format(`YYYY-MM-${1}`);
        axios.get(`http://localhost:8000/api/checkin?checkInDate__gte=${dateg}`)
            .then(res=>{
                let checkIn = res.data.filter(item=>{
                    return item.productId == this.props.match.params.id
                });
                checkIn.map(item=>{
                    console.log(`${moment(item.checkInDate).format("MMM, YYYY")} ${moment(Date.now()).format("MMM, YYYY")}`)
                    if(moment(item.checkInDate).format("MMM, YYYY") == moment(Date.now()).format("MMM, YYYY")){
                        this.state.data.donut.purchase += item.quantity
                        console.log("Anything")
                    } else {
                        let key = moment(item.checkInDate).format("MMM, YYYY");
                        this.state.data.column.checkIn[key] += item.quantity
                        console.log("AnotherThing")
                    }
                });
                console.log(this.state.data.column.checkIn);
                axios.get(`http://localhost:8000/api/orderd?orderedDate__gte=${dateg}`)
                    .then(res=>{
                        let checkOut = res.data.filter(item=>{
                            return item.productId == this.props.match.params.id
                        });
                        checkOut.map(item=>{
                            if(moment(item.orderedDate).format("MMM, YYYY") == moment(Date.now()).format("MMM, YYYY")){
                                this.state.data.donut.sells += item.quantity
                            } else {
                                let key = moment(item.orderedDate).format("MMM, YYYY");
                                this.state.data.column.checkOut[key] += item.quantity;
                            }
                            return ""
                        });
                        console.log(this.state.data.column.checkOut);


                        let sum = 0;
                        for (let key in this.state.data.column.checkOut) {
                            sum += this.state.data.column.checkOut[key]
                        }
                        let avg = sum/5;
                        console.log(`The average is: ${avg}.`)
                        let eoq;
                        axios.get(`http://localhost:8000/api/managef/?productId=${this.state.id}`)
                            .then(res=>{
                                this.state.data.donut.curStock = res.data[0].inventory
                                this.state.data.donut.preStock = this.state.data.donut.sells+this.state.data.donut.curStock-this.state.data.donut.purchase
                                this.setState({
                                    loadDonut:true
                                })
                                let annualDemand = avg * 12
                                eoq = Math.sqrt(2*annualDemand*res.data[0].orderingCost/res.data[0].holdingCost)
                                this.state.data.column.eoq = eoq
                                this.state.data.column.avgDemand = avg
                                this.setState({
                                    loadColumn: true
                                });
                            });
                    })
            })


    }

    render() {
        return (
            <div style={{width:"100%", height:"100%", display:"flex"}}>
                <div className="lSide" style={{width:"300px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    {this.state.loadDonut ?
                        <DonutChart {...this.state.data.donut}/>
                        : <Spin/>
                    }
                </div>
                <div className="side" style={{width:"700px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    {this.state.loadColumn ?
                        <ColumnLineChart {...this.state.data.column}/>
                        : <Spin/>
                    }
                </div>
            </div>
        );
    }


}

export default ProductDetail;