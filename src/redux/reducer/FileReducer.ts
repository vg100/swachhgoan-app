export const fileReducer = (
  state = {
    file: [],
    islected: false,
  },
  action: any,
) => {
  switch (action.type) {
    case 'setFile':
      return {
        ...state,
        file: action.payload,
      };
    default:
      return state;
  }
};
