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


  export const allUsersReducer = (state = { 
    users: [],
    isRefresh:false
  
  },  action:any) => {
    switch (action.type) {
        case AuthActionTypes.ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case AuthActionTypes.ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                isRefresh:false,
                users: action.payload,
            };
            case AuthActionTypes.IS_REFRESH:{
              return {
                ...state,
                isRefresh:true
              }
            }
        case AuthActionTypes.ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
  