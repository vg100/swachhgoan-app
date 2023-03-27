import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Api} from './Api';
import {EventActionTypes} from './EventRepositry';

export enum AttendanceActionTypes {
  ADD_ATTENDANCE = 'add attendance',
}

export class AttendanceRepositry {
  static addAttendance(id: any, data: any) {
    return async (dispatch: any) => {
      try {
        dispatch({type: 'showLoader'});
        const user = await Api.addAttendance(id, data);
        showMessage({
          message: user.message,
          type: 'success',
        });
        dispatch({type: EventActionTypes.IS_REFRESH});
        dispatch({type: 'hideLoader'});
      } catch (error) {
        dispatch({type: 'hideLoader'});
        return Promise.reject(error);
      }
    };
  }

  static finalSubmit(id: any, list: any, data: any) {
    return async (dispatch: any) => {
      try {
        dispatch({type: 'showLoader'});
        const formData = new FormData();
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        });
        list.forEach(async (image: any) => {
          formData.append('file', image);
        });
        const event = await Api.finalSubmit(id, formData);
        dispatch({type: EventActionTypes.IS_REFRESH});
        dispatch({type: 'hideLoader'});
        showMessage({
          message: event.message,
          type: 'success',
        });
      } catch (e) {
        dispatch({type: 'hideLoader'});
        return Promise.reject(e);
      }
    };
  }
}
