export const LoaderReducer = (
  state = {
    appLoader: false,
  },
  action: any,
) => {
  switch (action.type) {
    case 'showLoader':
      return {
        ...state,
        appLoader: true,
      };
    case 'hideLoader':
      return {
        ...state,
        appLoader: false,
      };
    default:
      return state;
  }
};
