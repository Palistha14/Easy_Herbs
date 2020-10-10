import React, {Component} from 'react';
import {Button, Form, Icon, Input, Upload} from "antd";
import '../../assets/css/AddProduct.scss';

class EditTable extends Component {
    state = {
        fileList: [
            {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png',
            },
        ],
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    handleChange = info => {
        let fileList = [...info.fileList];
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
    };
    render() {
        const { getFieldDecorator } = this.props.form;

        const props = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange,
            multiple: true,
        };
        return (
            <div className={"main-form"}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className={"form-product form-edit"}>
                    <h2>Product edit</h2>
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
                                placeholder="Price" className={"product-control"}
                            />
                        )}
                    </Form.Item>
                    <Form.Item className={"input-control"}>
                        <Upload {...props} fileList={this.state.fileList} className={"product-control"}>
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item className={"form-product"}>
                        <div className={"sub"}>
                            <button className={"form-button"} onClick={this.handleSubmit}>Edit</button>
                        </div>
                    </Form.Item>
                    </div>
                </Form>
            </div>
        );
    }
}

const WrappedEditTableForm = Form.create({ name: 'edit-table' })(EditTable);

export default WrappedEditTableForm;