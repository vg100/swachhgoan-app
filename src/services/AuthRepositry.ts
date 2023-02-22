import {Api} from './Api';
import {AsyncStorageService} from './AsyncStorage';

export enum AuthActionTypes {
  LOGIN_REQUEST = 'Login Request',
  LOGIN_REQUEST_SUCCESS = 'Login Request Success',
  USER_ERROR_OCCURRED = 'User Error Occurred',
  USER_LOGOUT = 'User Logout',
  USER_UPDATE = 'User UPdate',
}
export class   AuthRepositry {
  static login(data:any) {
    return async (dispatch:any) => {
      try {
        dispatch({type: AuthActionTypes.LOGIN_REQUEST});
        const user = await Api.login(data);
        console.log(user,'hh')
        if(user?.user?.role==='admin'){
          console.log(user)
          dispatch({
            type: AuthActionTypes.LOGIN_REQUEST_SUCCESS,
            payload: {...user,isAdmin:true},
          });
          await AsyncStorageService.setUser({...user,isAdmin:true});
        }else{
          dispatch({
            type: AuthActionTypes.LOGIN_REQUEST_SUCCESS,
            payload: {...user,isAdmin:false},
          });
          await AsyncStorageService.setUser({...user,isAdmin:false});
        }
        // dispatch({
        //   type: AuthActionTypes.LOGIN_REQUEST_SUCCESS,
        //   payload: {...data,isAdmin:false},
        // });
        // await AsyncStorageService.setUser({...data,isAdmin:false});
        // data
       
    
        // return user;
      } catch (e) {
        console.log(e);
        dispatch({type: AuthActionTypes.USER_ERROR_OCCURRED});
        return Promise.reject(e);
      }
    };
  }
  static updateUser(user:any) {
    return async (dispatch:any) => {
      try {
        dispatch({type: AuthActionTypes.USER_UPDATE,
          payload: user,
        });
        return;
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }

  static logout() {
    return async (dispatch:any) => {
      await AsyncStorageService.clearUser();
      dispatch({type:AuthActionTypes.USER_LOGOUT});
      return;
    };
  }

}
