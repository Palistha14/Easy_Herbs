import { Table, Tag } from 'antd';
import React, {Component} from "react";
import axios from "axios";
import {Spin} from "antd/es";
const columns = [
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Safety Stock',
        dataIndex: 'sStock',
        key: 'sStock',
    },
    {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
        {tags.map(tag => {
            // let color = tag.length > 5 ? 'geekblue' : 'green';
            let color;
            if (tag === 'understock') {
                color = 'volcano';
            }
            else if (tag === "available"){
                color = 'green';
            }
            return (
                <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
            );
        })}
      </span>
        ),
    },
];

class StockTable extends Component{
    state = {
        data : [],
        loadTab:false
    }

    componentDidMount() {
        // console.log("hello",this.props)
        // console.log(this.props.products)
        this.props.products.map(item => {
            // console.log(item)
            axios.get("http://localhost:8000/api/managef/?productId="+item.id)
            .then(res => {
                let quantity = res.data[0].inventory;
                let sStock = res.data[0].safetyStock;
                this.state.data.push({
                    key: item.id,
                    product: item.name,
                    quantity: quantity,
                    sStock:sStock,
                    tags: quantity > sStock ? ['available'] : ['understock'],
                })
                this.setState({
                    loadTab:true
                })
            })
        })

    }

    render() {
        return(
            this.state.loadTab ?
            <div style={{width: '1080px', marginTop: '20px'}}>
                <Table columns={columns} dataSource={this.state.data}/>
            </div>
            :
            <Spin/>
        )
    }
}

// ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);

export default StockTable