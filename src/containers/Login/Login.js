import React, {Component} from 'react';
import '../../assets/css/LoginRegister.scss';

import {Spin, Icon, Form, Input, Button} from 'antd';
import {connect} from "react-redux";

import * as actions from "../../store/actions/auth"

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;



class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onAuth(values.username, values.password)
            }
        });
        // this.props.history.push("/")
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        let errorMessage = null;
        if(this.props.error){
            errorMessage = "Error" /*("Error"
                // <p>{this.props.error}</p>
            );*/
        }
        return (
            <div>
                {errorMessage}
            {
                this.props.loading ?

                <Spin indicator={antIcon} />

                :

                <div className="log">
                    <div className="log-box">
                        <h2>Login</h2>
                        <form onSubmit={this.handleSubmit}>
                            <FormItem className="inputBox">
                                {/*{getFieldDecorator}*/}
                                {/*<input className="i1" type="text" value={this.state.username} placeholder="Username" required=""*/}
                                {/*       name={"username"} onChange={this.handleChange}/>*/}
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </FormItem>
                            <FormItem className="inputBox">
                                {/*<input className="i1" type="password" placeholder="Password" required=""/>*/}
                                {/*<label>password</label>*/}
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </FormItem>
                            <Form.Item className={"sub"}>
                                <Button type="primary" htmlType="submit" className={"button-sub"}>
                                    Login
                                </Button>
                            </Form.Item>
                        </form>
                    </div>
                </div>
            }
            </div>
        );
    }
}

// const Login = () => {
//     const logged = useSelector(state => state.logged)
//     return (<LoginClass logged={logged}/>)
// }


const WrappedNormalLoginForm = Form.create()(Login);

const mapStateToProps = state =>{
    return{
        loading: state.logged.loading,
        error: state.logged.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);