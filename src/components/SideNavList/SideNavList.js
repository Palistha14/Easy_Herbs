import React from "react";

const SideNavList = props => {
    return(
        <nav>
            {props.list.map( item =>(
                <NavItem label = {item}/>
            ))}
        </nav>
    )
};

const NavItem = props => {
    return(
        <div className="nav-item">
            {props.label}
        </div>
    )
};

export default SideNavList;