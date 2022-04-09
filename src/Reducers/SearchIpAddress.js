const initialState = {
  IpAddress: "",
};

const SearchIpAddress = (state = initialState, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return {
        ...state,
        IpAddress: action.payload,
      };
    default:
      return state;
  }
};

export default SearchIpAddress;
