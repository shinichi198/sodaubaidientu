import { YEAR_LOADED_FAIL, YEAR_LOADED_SUCCESS } from "../contexts/constants";

export const yearReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case YEAR_LOADED_SUCCESS:
      return {
        ...state,
        years: payload,
        yearLoading: false,
      };
    case YEAR_LOADED_FAIL:
      return {
        ...state,
        years: [],
        yearLoading: false,
      };
    default:
      return state;
  }
};
