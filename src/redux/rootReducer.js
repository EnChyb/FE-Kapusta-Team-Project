import { combineReducers } from "redux";
import balanceReducer from "./balance/balanceSlice";

const rootReducer = combineReducers({
	balance: balanceReducer,
});

export default rootReducer;
