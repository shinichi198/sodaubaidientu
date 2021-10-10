import {
  ADD_WEEK,
  DELETE_CLASS,
  FIND_WEEK,
  UPDATE_CLASS,
  WEEK_LOADED_FAIL,
  WEEK_LOADED_SUCCESS,
} from "../contexts/constants";

export const weekReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case WEEK_LOADED_SUCCESS:
      return {
        ...state,
        weeks: payload,
        weekLoading: false,
      };
    case WEEK_LOADED_FAIL:
      return {
        ...state,
        weeks: [],
        weekLoading: false,
      };
    case ADD_WEEK:
      return {
        ...state,
        weeks: [...state.weeks, payload],
      };
    case DELETE_CLASS:
      return {
        ...state,
        weeks: state.weeks.filter((tuan) => tuan._id !== payload),
      };
    case FIND_WEEK:
      return {
        ...state,
        week: payload,
      };
    case UPDATE_CLASS:
      const newWeek = state.weeks.map((tuan) =>
        tuan._id === payload._id ? payload : tuan
      );
      return { ...state, weeks: newWeek };
    default:
      return state;
  }
};
