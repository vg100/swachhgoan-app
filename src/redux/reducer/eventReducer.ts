import { EventActionTypes } from "../../services/EventRepositry";


  const initialState = {
    eventItems: [],
  pastEvent:[],
  upcomingEvent:[],
    loaded: false,
    loading: false,
    isRefresh:false
  };
  
  export const EventReducer = (state = initialState,action:any) => {
    switch (action.type) {
      case EventActionTypes.EVENT_REQUEST: {
        return {...state, loading: true};
      }
      case EventActionTypes.EVENT_REQUEST_SUCCESS: {
        return {
          ...state,
          eventItems: action.payload,
          loading: false,
          loaded: true,
          isRefresh:false
        };
      }
      case EventActionTypes.IS_REFRESH:{
        return {
          ...state,
          isRefresh:true
        }
      }
      case EventActionTypes.EVENT_REQUEST_FAILED: {
        return {...initialState};
      }
      case EventActionTypes.ADD_EVENT: {
        const eventItems = state.eventItems.concat(action.payload);
        return {...state, eventItems};
      }
      case EventActionTypes.GET_PAST_EVENT: {
        return {
          ...state,
          pastEvent:action.payload,
        }
      }
      case EventActionTypes.GET_UPCOMING_EVENT: {
        return {
          ...state,
          upcomingEvent:action.payload,
        }
      }
      case EventActionTypes.USER_LOGOUT: {
        return {...initialState};
      }
      default: {
        return state;
      }
    }
  };