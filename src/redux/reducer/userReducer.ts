import { AuthActionTypes } from "../../services/AuthRepositry"
const initialState = {
    user: null,
    loggedIn: false,
    loggingIn: false,
    isAdmin:false
  };

export const UserReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case AuthActionTypes.LOGIN_REQUEST: {
        return {...state, loggingIn: true};
      }
      case AuthActionTypes.LOGIN_REQUEST_SUCCESS:
      case AuthActionTypes.USER_UPDATE: {
        return {...state, loggingIn: false, loggedIn: true,...action.payload};
      }
      case AuthActionTypes.USER_ERROR_OCCURRED: {
        return {...initialState};
      }
      case AuthActionTypes.USER_LOGOUT: {
        return {...initialState};
      }
      default: {
        return state;
      }
    }
  };
  