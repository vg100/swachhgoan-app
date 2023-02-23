import { Api } from "./Api";

export enum EventActionTypes {
  ADD_EVENT = 'Add event item',
  EVENT_REQUEST = 'Event Request',
  EVENT_REQUEST_SUCCESS = 'Event Request Success',
  EVENT_REQUEST_FAILED = 'Event Request Failed',
  USER_LOGOUT = 'User Logout',

  GET_PAST_EVENT = 'Get past event ',
  GET_UPCOMING_EVENT = 'Get upcoming event ',

  IS_REFRESH='isRefresh'
}

export class EventRepositry {
  static getEventList() {
    return async (dispatch: any) => {
      dispatch({ type: EventActionTypes.EVENT_REQUEST });
      try {
        const user = await Api.getAllEvents();
        console.log(user,'hh')

        dispatch({
          type: EventActionTypes.EVENT_REQUEST_SUCCESS,
          payload: user,
        });
        return user;
      } catch (error) {
        dispatch({
          type: EventActionTypes.EVENT_REQUEST_FAILED
        });
        return Promise.reject(error);
      }
    }
  }

  static getPastEvent() {
    return async (dispatch: any, getState: any) => {
      const { eventItems } = getState().event
      const get = eventItems.filter((event: any) => event.location === "allahabad")
      dispatch({
        type: EventActionTypes.GET_PAST_EVENT,
        payload: eventItems,
      });

    }
  }


  static getUpcomingEvent() {
    return async (dispatch: any, getState: any) => {
      const { eventItems } = getState().event
      const get = eventItems.filter((event: any) => event.location === "allahabad")
      dispatch({
        type: EventActionTypes.GET_UPCOMING_EVENT,
        payload: eventItems,
      });
    }
  }

  static addNewEvent(list:any,data:any) {
    return async (dispatch: any, getState: any) => {
      try {
        const formData = new FormData();
        Object.keys(data).forEach((key)=>{
          formData.append(key,data[key])
        })
        list.forEach(async (image:any) => {
          formData.append('file', image);
        });
        const response=await Api.addNewEvent(formData);

        dispatch({ type: EventActionTypes.IS_REFRESH})
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }

}