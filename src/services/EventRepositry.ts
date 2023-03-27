import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Api} from './Api';

export enum EventActionTypes {
  ADD_EVENT = 'Add event item',
  EVENT_REQUEST = 'Event Request',
  EVENT_REQUEST_SUCCESS = 'Event Request Success',
  EVENT_REQUEST_FAILED = 'Event Request Failed',
  USER_LOGOUT = 'User Logout',
  GET_PAST_EVENT = 'Get past event ',
  GET_UPCOMING_EVENT = 'Get upcoming event ',
  IS_REFRESH = 'isRefresh',
  EVENT_FILTED_DATA = 'event filtered data',
}

export class EventRepositry {
  static getEventList(id: any) {
    return async (dispatch: any, getState: any) => {
      dispatch({type: 'showLoader'});
      dispatch({type: EventActionTypes.EVENT_REQUEST});
      try {
        const {isAdmin} = getState().userLogin;
        // const {slectedUserId} = getState().selectUser;
        var user;

        if (isAdmin) {
          user = await Api.getAllEvents(`/event?userId=${id}`);
        } else {
          user = await Api.getAllEvents('/event/');
        }

        // {
        //   user= await Api.getAllEvents('/event');
        // }

        dispatch({
          type: EventActionTypes.EVENT_REQUEST_SUCCESS,
          payload: user,
        });
        dispatch({type: 'hideLoader'});
       
        return user;
      } catch (error) {
        dispatch({
          type: EventActionTypes.EVENT_REQUEST_FAILED,
        });
        return Promise.reject(error);
      }
    };
  }

  static getDoneEvent() {
    return async (dispatch: any, getState: any) => {
      const {eventItems} = getState().event;
      // const get = eventItems.filter((event: any) => {
      //   let startDate = new Date(event.startDate);
      //   let endDate = new Date(event.endDate);
      //   let currentDate = new Date();
      //   if (currentDate > startDate && currentDate > endDate) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // });

      const get = eventItems.filter((event: any) => event.isDone === true);
      console.log(eventItems, 'hh');
      dispatch({
        type: EventActionTypes.EVENT_FILTED_DATA,
        payload: get,
      });
    };
  }

  static getUpcomingEvent() {
    return async (dispatch: any, getState: any) => {
      const {eventItems} = getState().event;
      const get = eventItems.filter((event: any) => {
        let startDate = new Date(event.startDate);
        let endDate = new Date(event.endDate);
        let currentDate = new Date();
        if (currentDate < startDate && currentDate < endDate) {
          console.log('UpcomingEvent - true');
          return true;
        } else {
          console.log('UpcomingEvent - true');
          return false;
        }
      });
      dispatch({
        type: EventActionTypes.EVENT_FILTED_DATA,
        payload: get,
      });
    };
  }

  static getOngoingEvent() {
    return async (dispatch: any, getState: any) => {
      const {eventItems} = getState().event;
      const get = eventItems.filter((event: any) => event.isDone !== true);
      dispatch({
        type: EventActionTypes.EVENT_FILTED_DATA,
        payload: get,
      });
    };
  }

  static addNewEvent(data: any) {
    return async (dispatch: any, getState: any) => {
      try {
        // dispatch({type: "showLoader"});
        // const formData = new FormData();
        // Object.keys(data).forEach(key => {
        //   formData.append(key, data[key]);
        // });
        // list.forEach(async (image: any) => {
        //   formData.append('file', image);
        // });
        const {isAdmin} = getState().userLogin;
        const {slectedUserId} = getState().selectUser;
        var events
        if (isAdmin) {
          events= await Api.addNewEvent(`/event/add/${slectedUserId}`, data);
        } else {
          events=await Api.addNewEvent(`/event/add`, data);
        }

        dispatch({type: EventActionTypes.IS_REFRESH});
        dispatch({type: 'hideLoader'});
        showMessage({
          message: events.message,
          type: 'success',
        });
      } catch (error) {
        Alert.alert('gg');
        return Promise.reject(error);
      }
    };
  }

  static updateEvent(id: any, list: any, data: any) {
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
        const event = await Api.updateEvent(id, formData);
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

  static deleteFile(id: any, index: any) {
    return async (dispatch: any) => {
      try {
        dispatch({type: 'showLoader'});
        const event = await Api.deleteFile(id, index);
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
