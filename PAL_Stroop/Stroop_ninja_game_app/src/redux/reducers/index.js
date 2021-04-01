import { combineReducers, Reducer } from "redux";
import TestReducer from "./test.reducer";
import UserdataReducer from "./userdata.reducer";


const allReducers = {
  test: TestReducer,
  userdata: UserdataReducer
};

const rootReducer = combineReducers({ ...allReducers });

export default rootReducer;
