import { Form, Input, Select, Button } from 'antd';
import React from "react";
import axios from 'axios';
import StockTable from "./StockTable";
import {Link, useHistory} from "react-router-dom";
import RedirectTo from "../../RedirectTo/RedirectTo";

const { Option } = Select;

class Demo extends React.Component {
    state={
        productList:[],
        loadTab:false,
    };
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/products/').then(res=>{
            // console.log(res.data);
            this.setState({
                productList:res.data,
                loadTab: true
            })
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        console.log("This should not be printed")
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data;
                // console.log('Received values of form: ', values);
                axios.get("http://localhost:8000/api/managef/?productId="+values.product)
                .then(res => {
                    data = res.data[0];
                    console.log(data)
                    axios.put(`http://localhost:8000/api/managef/${data.id}/`,{
                        'productId':data.productId,
                        'inventory':parseInt(data.inventory)+parseInt(values.quantity),
                        'safetyStock': data.safetyStock,
                        'demand':data.demand,
                        'holdingCost': data.holdingCost,
                        'orderingCost': data.orderingCost,
                        'requestNo':data.requestNo+1,
                    })
                    .then(
                        axios.post(`http://localhost:8000/api/checkin/`,{
                            'productId':data.productId,
                            'quantity':parseInt(values.quantity)
                        })
                        .then(
                            window.location = "/admin/restock/"
                        )
                    )
                })
            }
        });
    };
    handleNumberChange = e => {
        const number = parseInt(e.target.value || 0, 10);
        if (isNaN(number)) {
            return;
        }
        // console.log(number)
        this.setState({
            quantity: number
        })
    };

    handleProductChange = e => {
        // console.log(e)
        this.setState({
            productId: e
        })
    };

    render() {
        const { size, value } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <>
            <h3>Restock</h3>
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('product', {
                        initialValue: "Select a product",
                    })(
                        <Select
                            style={{ width: '100%' }}
                            onChange={this.handleProductChange}
                        >
                            {this.state.productList.map(item=>(
                                <Option value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('quantity', {
                        initialValue: 0,
                        rules: [{ }],
                    })(
                        <Input
                            type="text"
                            onChange={this.handleNumberChange}
                            style={{ width: '65%', marginRight: '3%' }}
                        />
                    )}
                </Form.Item>

                <Form.Item>
                    <Button to={"/admin/restock/"} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {this.state.loadTab ?
                <StockTable products={this.state.productList}/>
                :
                ""
            }
            </>
        );
    }
}

const WrappedDemo = Form.create({ name: 'customized_form_controls' })(Demo);

export default WrappedDemo