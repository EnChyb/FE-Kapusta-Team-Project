import { combineReducers } from "redux";
import balanceReducer from "./balance/balanceReducer";

const rootReducer = combineReducers({
	balance: balanceReducer,
});

export default rootReducer;
