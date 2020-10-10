import React, {Component} from 'react';
import axios from 'axios';
import "../assets/css/Contact.scss";

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }

    handleSubmit(e){
        e.preventDefault();
        axios({
            method: "POST",
            url:"http://localhost:3002/send",
            data:  this.state
        }).then((response)=>{
            if (response.data.status === 'success'){
                alert("Message Sent.");
                this.resetForm()
            }else if(response.data.status === 'fail'){
                alert("Message failed to send.")
            }
        })
    }

    resetForm(){
        this.setState({name:'', email:'', message:''})
    }

    render() {
        return(
            <div className="contact-style">
                <p className="p1-contact">Contact Us</p>
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Your name" id="name" value={this.state.name}
                               onChange={this.onNameChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Your email address" id="email" aria-describedby="emailHelp"
                               value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea className="form-control" rows="3" placeholder="Write something..." id="message" value={this.state.message}
                                  onChange={this.onMessageChange.bind(this)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }

    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onMessageChange(event) {
        this.setState({message: event.target.value})
    }
}

export default Contact;