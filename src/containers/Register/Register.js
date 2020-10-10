import React, {Component} from 'react';
import '../../assets/css/LoginRegister.scss';

import {
    Form,
    Input,
    Icon,
    Button,
} from 'antd';
import * as actions from "../../store/actions/auth";
import { connect } from "react-redux"


class Register extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onAuth(
                    values.username,
                    values.email,
                    values.password,
                    values.confirm
                );
            }
        });
        this.props.history.push("/");
    };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="log">
                <div className="box">
                    <h2>Sign up</h2>
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Item className={"i1"}>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>

                        <Form.Item className={"i1"}>
                            {getFieldDecorator('email', {
                                rules: [{type: 'email', message: 'The input is not valid E-mail!',},
                                    {required: true,message: 'Please input your E-mail!',},],
                            })(
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email"
                                />
                            )}
                        </Form.Item>

                        <Form.Item className={"i1"}>
                            {getFieldDecorator('password', {
                                rules: [{required: true,message: 'Please input your password!',},
                                    {validator: this.validateToNextPassword,},],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>

                        <Form.Item className={"i1"}>
                            {getFieldDecorator('confirm', {rules: [{required: true, message: 'Please confirm your password!',},
                                    {validator: this.compareToFirstPassword,},],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    onBlur={this.handleConfirmBlur}
                                    placeholder="Confirm Password"
                                />
                            )}
                        </Form.Item>


                        <Form.Item className={"i1"}>
                            {getFieldDecorator('name', {rules: [{required: true, message: 'Please enter your name!',}],
                            })(
                                <Input
                                    placeholder="Full Name"
                                />
                            )}
                        </Form.Item>

                        <Form.Item className={"i1"}>
                            {getFieldDecorator('address', {rules: [{required: true, message: 'Please enter your address!',}],
                            })(
                                <Input
                                    placeholder="Enter Address"
                                />
                            )}
                        </Form.Item>

                        <Form.Item className={"i1"}>
                            {getFieldDecorator('contact', {rules: [{required: true, message: 'Please enter your contact detail!',}],
                            })(
                                <Input
                                    placeholder="Contact No."
                                />
                            )}
                        </Form.Item>

                        <Form.Item className={"sub"}>
                            <Button type="primary" htmlType="submit" className={"button-sub"}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}


const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);


const mapStateToProps = state =>{
    return{
        loading: state.logged.loading,
        error: state.logged.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm)