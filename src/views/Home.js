import React, {Component} from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import axios from 'axios'
import img from "../assets/images/u.jpg";
import '../assets/css/Contact.scss'
// import img from "../assets/images/u.jpg";
import ProductImg from "../components/ProductImg/ProductImg";
import {useSelector} from "react-redux";


class Demo extends Component {
    state={
        images:[],
        properties:{
            duration: 5000,
            transitionDuration: 500,
            infinite: true,
            indicators: true,
            arrows: true
        },
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/slide/').then(res=>{
            // console.log(res.data);
            this.setState({
                images:res.data
            })
        })
    }

    render() {

        return (
            <div>
                <div className="home-style">
                    <SimpleImageSlider
                        width={1242}
                        height={450}
                        images={this.state.images}
                        properties={this.state.properties}
                    />
                </div>
                <ProductImg userStatus={this.props.status}/>
            </div>
        );
    }
}

const Home = () => {
    const userStatus = useSelector(state => state.logged);
    return (<Demo status={userStatus}/>)
}
export default Home;
