import { combineReducers } from "redux";
import UserIp from "./UserIp";
import SearchIpAddress from "./SearchIpAddress";

const reducers = combineReducers({
  UserIp,
  SearchIpAddress,
});

export default reducers;
