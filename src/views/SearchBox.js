import React, {Component} from 'react';
import searchIcon from "../assets/images/search-icon.png";
import '../assets/css/Search.scss'
// import { createHashHistory } from 'history'
// export const history = createHashHistory()
class SearchBox extends Component {
    render() {
        return (
            <div className="nav__search-form">
                <input className="nav__search-input" id={"search"} placeholder="Search products"/>
                <button
                    style={{'backgroundImage':'url('+ searchIcon +')'}}
                    onClick={()=>{
                        let search = document.querySelector("#search").value
                        // history.push(`/search/${search}`)
                        window.location="/search/"+search
                    }}
                    className="nav__search-button"/>
            </div>
        );
    }
}

export default SearchBox;