import { GRADE_LOADED_FAIL, GRADE_LOADED_SUCCESS } from "../contexts/constants";

export const gradeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GRADE_LOADED_SUCCESS:
      return {
        ...state,
        grades: payload,
        gradeLoading: false,
      };
    case GRADE_LOADED_FAIL:
      return {
        ...state,
        grades: [],
        gradeLoading: false,
      };
    default:
      return state;
  }
};
