import { EventActionTypes } from "../../services/EventRepositry";


  const initialState = {
    eventItems: [],
    filtedData: [],
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
      case EventActionTypes.EVENT_FILTED_DATA: {
        return {
          ...state,
          filtedData:action.payload,
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