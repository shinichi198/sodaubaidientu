import {
  ADD_LOCKCLASS,
  DELETE_LOCKCLASS,
  LOCKCLASS_LOADED_FAIL,
  LOCKCLASS_LOADED_SUCCESS,
  UPDATE_LOCKCLASS,
} from "../contexts/constants";
export const lockclassReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOCKCLASS_LOADED_SUCCESS:
      return {
        ...state,
        lockclasss: payload,
        lockclassLoading: false,
      };
    case LOCKCLASS_LOADED_FAIL:
      return {
        ...state,
        lockclasss: [],
        lockclassLoading: false,
      };
    case ADD_LOCKCLASS:
      return {
        ...state,
        lockclasss: [...state.lockclasss, payload],
      };
    case DELETE_LOCKCLASS:
      return {
        ...state,
        lockclasss: state.lockclasss.filter((db) => db._id !== payload),
      };
    case UPDATE_LOCKCLASS:
      const newLockclass = state.lockclasss.map((lock) =>
        lock._id === payload._id ? payload : lock
      );
      return { ...state, lockclasss: newLockclass };
    default:
      return state;
  }
};
