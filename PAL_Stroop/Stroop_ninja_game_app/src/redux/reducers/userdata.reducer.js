import { UserdataTypes } from "../types";
const initialState = {
  email: "",
  _id: "",
  pastQueue: [],
};

const UserdataReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserdataTypes.SET_USER_DATA:
      return { ...state, ...action.payload };
    case UserdataTypes.QUEUE_USER_DATA:
      return { ...state, pastQueue: [...state.pastQueue, action.payload] };
    case UserdataTypes.DEQUEUE_USER_DATA:
      var a = state.pastQueue.filter((el) => {
        return !(el.time === action.payload.time);
      });
      return { ...state, pastQueue: a };
    default:
      return state;
  }
};

export default UserdataReducer;
