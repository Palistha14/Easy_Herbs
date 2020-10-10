import React, {Component} from 'react';
import '../../assets/css/AddProduct.scss'
import axios from "axios";
import {connect} from "react-redux";
import {Form, Input, message, Upload, Button, Icon, Select} from "antd";

const { Option } = Select;


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class AddProduct extends Component {
    state = {
        loading:false,
        image:null,
        category:null,
    };
    category = {
        hb: 1,
        hs: 2,
        hp: 3,
        ls: 4,
        tc: 5
    }

    onChange=(value)=> {
        this.state.category = this.category[value]
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err && beforeUpload(this.state.image)) {

                const product = new FormData();
                product.append("name", values.name)
                product.append("price", values.price)
                product.append("description", values.description)
                product.append("category", this.state.category)
                product.append("image", this.state.image, this.state.image.name)
                axios.post(`http://localhost:8000/api/products/`,product)
                .then(res=>{
                    let id = res.data.id
                    const manage = new FormData();
                    manage.append("productId", id)
                    manage.append("safetyStock", values.safetyStock)
                    manage.append("holdingCost", values.holdingCost)
                    manage.append("orderingCost", values.orderingCost)
                    axios.post(`http://localhost:8000/api/manageo/`,manage)
                    .then(res=>{
                        console.log(res)
                        message.success("New Product Added")
                        window.location = "/admin/product"
                    })
                })
                // console.log(product)
            }
        });
    };
    handleChange = event => {
        this.setState({
            image: event.target.files[0]
        })
    };


    render() {
        const { getFieldDecorator } = this.props.form;

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;

        return (
            <div className={"main-form"} style={{display:"flex", flex:"1", flexFlow:"column", alignItems:"center"}}>
                <div className={"form-product"}>
                <h2 style={{width:"100%", display:"flex", justifyContents:"flex-start"}}>New Product</h2>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item className={"input-control"}>
                        {getFieldDecorator('name', {rules: [{required: true, message: 'Please enter product name!',}],
                        })(
                            <Input
                                placeholder="Product Name" className={"product-control"}
                            />
                        )}
                    </Form.Item>
                    <Form.Item className={"input-control"}>
                        {getFieldDecorator('description', {rules: [{required: true, message: 'Please enter product description!',}],
                        })(
                            <Input
                                placeholder="Description" className={"product-control"}
                            />
                        )}
                    </Form.Item>
                    <Form.Item className={"input-control"}>
                        {getFieldDecorator('price', {rules: [{required: true, message: 'Please enter price!',}],
                        })(
                            <Input
                                className={"product-control"}
                                type={"number"}
                                placeholder="Price"
                            />
                        )}
                    </Form.Item>
                    <Form.Item className={"input-control"}>
                        {getFieldDecorator('holdingCost', {rules: [{required: true, message: 'Please enter holding cost!',}],
                        })(
                            <Input
                                placeholder="Holding cost"
                                className={"product-control"}
                                type={"number"}
                            />
                        )}
                    </Form.Item>
                    <Form.Item className={"input-control"}>
                        {getFieldDecorator('orderingCost', {rules: [{required: true, message: 'Please enter ordering cost!',}],
                        })(
                            <Input
                                placeholder="Ordering cost" className={"product-control"}
                                type={"number"}
                            />
                        )}
                    </Form.Item>
                    <Form.Item className={"input-control"}>
                        {getFieldDecorator('safetyStock', {rules: [{required: true, message: 'Please enter safety stock!',}],
                        })(
                            <Input
                                placeholder="Safety stock" className={"product-control"}
                                type={"number"}
                            />
                        )}
                    </Form.Item>
                    <Form.Item className={"input-control"}>
                        <Select
                            className={"product-control"}
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a category"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="hb">Health & Beauty</Option>
                            <Option value="hs">Health Supplement</Option>
                            <Option value="hp">Herbal Products</Option>
                            <Option value="tc">Tea & Coffee</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className={"input-control"}>
                        {/*<Upload*/}
                        {/*    name="avatar"*/}
                        {/*    listType="picture-card"*/}
                        {/*    className="avatar-uploader"*/}
                        {/*    showUploadList={false}*/}
                        {/*    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/}
                        {/*    beforeUpload={beforeUpload}*/}
                        {/*    onChange={this.handleChange}*/}
                        {/*>*/}
                        {/*    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '70%' }} /> : uploadButton}*/}
                        {/*</Upload>*/}
                        <input type={"file"} onChange={this.handleChange} className={"product-control"}/>
                    </Form.Item>

                    <Form.Item className={"input-control"}>
                        <div className={"sub"}>
                            <button className={"form-button"} onClick={this.handleSubmit}>Add</button>
                        </div>
                    </Form.Item>

                    </Form>
                </div>
            </div>
        );
    }
}
// const getTotal=cart=>{
//     let sum=0;
//     cart.map(item=>{
//         sum+=item.price*item.quantity
//     });
//     return (sum);
//
// }
const WrappedAddProductForm = Form.create({ name: 'add-product' })(AddProduct);
export default WrappedAddProductForm;