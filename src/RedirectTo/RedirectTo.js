import React from "react";
import {useHistory} from "react-router";

const RedirectTo = props =>{
    const history = useHistory()
    return history.push(props.path)
};

export default RedirectTo;