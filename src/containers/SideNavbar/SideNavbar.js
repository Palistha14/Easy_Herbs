import React, {Component} from 'react';
import Logo from "../../components/Logo/Logo";
import SideNavList from "../../components/SideNavList/SideNavList";

class SideNavbar extends Component {
    state={
        list:["Dashboard", "CheckIn", "Product", "OrderList"]
    }
    render() {
        return (
            <sideNav>
                <Logo/>
                <SideNavList list={this.state.list}/>
            </sideNav>
        );
    }
}

export default SideNavbar;