import {Api} from './Api';
import {AsyncStorageService} from './AsyncStorage';

export enum AuthActionTypes {
  LOGIN_REQUEST = 'Login Request',
  LOGIN_REQUEST_SUCCESS = 'Login Request Success',
  USER_ERROR_OCCURRED = 'User Error Occurred',
  USER_LOGOUT = 'User Logout',
  USER_UPDATE = 'User UPdate',

  ALL_USERS_REQUEST = 'ALL USERS REQUEST',
  ALL_USERS_SUCCESS = 'ALL USERS SUCCESS',
  ALL_USERS_FAIL = 'ALL USERS FAIL',

  IS_REFRESH = 'IS REFRESH',

  DELETE_USER = 'delete user',
}
export class AuthRepositry {
  static login(data: any) {
    return async (dispatch: any) => {
      try {
        dispatch({type: AuthActionTypes.LOGIN_REQUEST});
        const user = await Api.login(data);
        if (user?.user?.role === 'admin') {
          dispatch({
            type: AuthActionTypes.LOGIN_REQUEST_SUCCESS,
            payload: {...user, isAdmin: true},
          });
          await AsyncStorageService.setUser({...user, isAdmin: true});
        } else {
          dispatch({
            type: AuthActionTypes.LOGIN_REQUEST_SUCCESS,
            payload: {...user, isAdmin: false},
          });
          await AsyncStorageService.setUser({...user, isAdmin: false});
        }
      } catch (e) {
        console.log(e);
        dispatch({type: AuthActionTypes.USER_ERROR_OCCURRED});
        return Promise.reject(e);
      }
    };
  }
  static updateUser(user: any) {
    return async (dispatch: any) => {
      try {
        dispatch({type: AuthActionTypes.USER_UPDATE, payload: user});
        return;
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }

  static logout() {
    return async (dispatch: any) => {
      await AsyncStorageService.clearUser();
      dispatch({type: AuthActionTypes.USER_LOGOUT});
      return;
    };
  }

  static createUser(data: any) {
    return async (dispatch: any) => {
      try {
        const user = await Api.createUser(data);
        dispatch({type: AuthActionTypes.IS_REFRESH});
        console.log(user, 'user');
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }

  static getAllUser() {
    return async (dispatch: any) => {
      dispatch({type: AuthActionTypes.ALL_USERS_REQUEST});
      try {
        const user = await Api.getAllUser();
        dispatch({type: AuthActionTypes.ALL_USERS_SUCCESS, payload: user});
      } catch (e) {
        dispatch({type: AuthActionTypes.ALL_USERS_FAIL});
        return Promise.reject(e);
      }
    };
  }
  static deleteUser(id:any) {
    return async (dispatch: any) => {
      try {
        const user = await Api.deleteUser(id);
        console.log(user)
        // dispatch({type: AuthActionTypes.DELETE_USER, payload: user});
        dispatch({type: AuthActionTypes.IS_REFRESH});
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
}
