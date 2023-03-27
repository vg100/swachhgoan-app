
 class BaseReducer {
    initialState = {};
  
    reducer = (state = this.initialState, action:any) => {
      const method = this[action.type];
  
      if (!method || action.error) {
        return state;
      }
  
      return method.call(this, state, action);
    };
  }


const ShowsAction={
     REQUEST_SHOW :'ShowsAction.REQUEST_SHOW';
     REQUEST_SHOW_FINISHED : 'ShowsAction.REQUEST_SHOW_FINISHED';
  
     REQUEST_EPISODES : 'ShowsAction.REQUEST_EPISODES';
     REQUEST_EPISODES_FINISHED : 'ShowsAction.REQUEST_EPISODES_FINISHED';
  
     REQUEST_CAST : 'ShowsAction.REQUEST_CAST';
     REQUEST_CAST_FINISHED : 'ShowsAction.REQUEST_CAST_FINISHED';
}
  

export default class ShowsReducer extends BaseReducer {
    initialState = {
      currentShowId: '74',
      show: null,
      episodes: [],
      actors: [],
    };
  
    [ShowsAction.REQUEST_SHOW_FINISHED](state:any, action:any) {
      return {
        ...state,
        show: action.payload,
      }
    }
  
    [ShowsAction.REQUEST_EPISODES_FINISHED](state:any, action:any) {
      return {
        ...state,
        episodes: action.payload,
      }
    }
  
    [ShowsAction.REQUEST_CAST_FINISHED](state:any, action:any) {
      return {
        ...state,
        actors: action.payload,
      }
    }
  }