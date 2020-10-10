import {Table, Badge, Menu, Dropdown, Icon, Button, Tag} from 'antd';
import React from "react";
import moment from "moment";
import axios from "axios";

const OrderTable = props => {
    let i=0;

    const capitalize = string =>{
        return string[0].toUpperCase()+ string.slice(1)
    }
    const data = [];

    for (let i = 0; i < 2; ++i) {
        data.push({
            key: i,
            name: 'Screem',
            platform: 'iOS',
            version: '10.3.4.5654',
            upgradeNum: 500,
            creator: 'Jack',
            createdAt: '2014-12-24 23:12:00',
        });
    }
    // console.log(data[0])
    const columns = [
        'orderId',
        'productId',
        'userId',
        'quantity',
        'orderedDate',
        'shippedDate',
        'action'
    ];

    i=0;


    return (
        <table style={{
            height: '74%',
            border: '1px solid #dddddd'
        }}>

            <tr style={{
                // height: '10px',
                borderBottom: '1px solid #dddddd'
            }}>
            {columns.map(col=>(
                <th style={{height:'20%', paddingLeft:"10px"}}>{capitalize(col)}</th>
            ))}
            </tr>
            {props.data.map(dat=>(
                    <tr style={{
                        // height: '15px',
                        borderBottom: '1px solid #dddddd',
                        padding: '0.2em'
                    }}>
                        <td style={{paddingLeft:"10px"}}>{dat.orderId}</td>
                        <td>{dat.productId}</td>
                        <td>{dat.userId}</td>
                        <td>{dat.quantity}</td>
                        <td>{moment(dat.orderedDate).format("MMM DD, YYYY")}</td>
                        <td>{dat.status ? moment(dat.shippedDate).format("MMM DD, YYYY") : <Tag color={"volcano"}>Pending</Tag>}</td>
                        <td  style={{paddingRight:"10px"}}>
                            {dat.status ? <Button disabled={true}>Accepted</Button>
                                :
                                <Button
                                    type={"primary"}
                                    onClick={() => {
                                        acceptOrder(dat)
                                    }}>
                                    Accept
                                </Button>
                            }
                        </td>
                    </tr>

            ))}
        </table>
    );
}

const acceptOrder = dat => {
    console.log(dat.id)
    axios.put("http://localhost:8000/api/order/"+dat.id+"/",{
        'orderId': dat.orderId,
        'userId':dat.userId,
        'productId':dat.productId,
        'quantity':dat.quantity,
        'status': true
    })
    .then(res => {
        // document.location = "/admin/order/"
        window.location.reload(false)
    })
}

// ReactDOM.render(<NestedTable />, mountNode);
export default OrderTable