import * as at from "./actionTypes";
import axios from "axios";

export const authStart=()=>{
    return{
        type:at.AUTH_START
    }
};

export const authSuccess=(token, username, status)=>{
    return{
        type:at.AUTH_SUCCESS,
        token:token,
        username:username,
        status: status
    }
};

export const authFail=error=>{
    return {
        type:at.AUTH_FAIL,
        error:error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate');
    console.log("Logged out beggining")
    return {
        type : at.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = expirationTime => {
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const authLogin=(username, password)=>{
    return dispatch => {
        dispatch(authStart());
        axios.post("http://127.0.0.1:8000/rest-auth/login/",{
            username: username,
            password: password
        })
        .then(res => {
            axios.get(`http://localhost:8000/api/customer/?username=${username}`)
            .then(adStatus=>{
                console.log(res.data)
                console.log(adStatus.data[0].isAdmin)
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime()+3600*1000);
                localStorage.setItem('token', token);
                localStorage.setItem('username', username)
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token, username, adStatus.data[0].isAdmin));
                dispatch(checkAuthTimeOut(3600));
                window.location = "/"
                // this.props.history.push("/")

            })

        })
        .catch(error=>{
            dispatch(authFail(error))
        })
    }
};

export const authSignup=(username, email, password1, password2)=>{
    return dispatch => {
        dispatch(authStart());
        axios.post("http://127.0.0.1:8000/rest-auth/registration",{
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime()+3600*1000);
            localStorage.setItem('token', token);
            localStorage.setItem('username', username)
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token, username));
            dispatch(checkAuthTimeOut(3600));

        })
        .catch(error=>{
            dispatch(authFail(error))
        })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date())
                dispatch(logout());
            else {
                let username = localStorage.getItem("username")
                axios.get(`http://localhost:8000/api/customer/?username=${username}`)
                .then(res=>{
                    dispatch(authSuccess(token, localStorage.getItem('username'), res.data[0].isAdmin));
                    dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
                })

                // window.location = "/"
            }
        }
    }
};