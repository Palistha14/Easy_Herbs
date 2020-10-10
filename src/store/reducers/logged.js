import * as at from "../actions/actionTypes"
import { updateObject } from "../utility";

const initState={
    status:false,
    username:null,
    token:null,
    error:null,
    loading:false
};

const authStart = (state, action) =>{
  return updateObject(state, {
      error: null,
      loading: true
  })
};

const authSuccess = (state, action) =>{
  return updateObject(state, {
      token: action.token,
      username: action.username,
      status: action.status,
      error: null,
      loading: false
  })
};

const authFail = (state, action) =>{
  return updateObject(state, {
      error: action.error,
      loading: false
  })
};

const authLogout = (state, action) =>{
    console.log("Logged Out");
  return updateObject(state, {
      token: null,
      username:null,
      status:false,
      loading: false
  })
};

const loggedReducer = (state=initState, action) => {
    switch (action.type) {
        case at.AUTH_START: return authStart(state, action);
        case at.AUTH_SUCCESS: return authSuccess(state, action);
        case at.AUTH_FAIL: return authFail(state, action);
        case at.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;

    }
};

export default loggedReducer;