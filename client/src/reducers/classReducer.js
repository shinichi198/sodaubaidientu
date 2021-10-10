import {
  ADD_CLASS,
  CLASS_LOADED_FAIL,
  CLASS_LOADED_SUCCESS,
  DELETE_CLASS,
  FIND_CLASS,
  UPDATE_CLASS,
} from "../contexts/constants";

export const classReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLASS_LOADED_SUCCESS:
      return {
        ...state,
        classs: payload,
        classLoading: false,
      };
    case CLASS_LOADED_FAIL:
      return {
        ...state,
        classs: [],
        classLoading: false,
      };
    case ADD_CLASS:
      return {
        ...state,
        classs: [...state.classs, payload],
      };
    case DELETE_CLASS:
      return {
        ...state,
        classs: state.classs.filter((lop) => lop._id !== payload),
      };
    case FIND_CLASS:
      return {
        ...state,
        lophoc: payload,
      };
    case UPDATE_CLASS:
      const newClasss = state.classs.map((lop) =>
        lop._id === payload._id ? payload : lop
      );
      return { ...state, classs: newClasss };
    default:
      return state;
  }
};
