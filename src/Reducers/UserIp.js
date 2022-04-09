const initialState = {
  response: {},
  isLoading: false,
  error: false,
  errorMessage: "",
};

function UserIp(state = initialState, action) {
  switch (action.type) {
    case "USER_IP_STARTED_FETCHING":
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: null,
      };
    case "USER_IP_FETCHED_SUCESS":
      return {
        ...state,
        isLoading: false,
        response: action.payload,
        error: false,
        errorMessage: null,
      };
    case "USER_IP_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.err,
        response: state.response,
      };

    default:
      return state;
  }
}

export default UserIp;
