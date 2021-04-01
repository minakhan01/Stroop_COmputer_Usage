import { UserdataTypes } from "../types";

export const setUserData = value => ({
    type: UserdataTypes.SET_USER_DATA,
    payload: value
});

export const queueUserData = value => ({
    type: UserdataTypes.QUEUE_USER_DATA,
    payload: value
});

export const dequeueUserData = value => ({
    type: UserdataTypes.DEQUEUE_USER_DATA,
    payload: value
});
