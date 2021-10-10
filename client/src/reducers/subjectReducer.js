import {
  ADD_SUBJECT,
  DELETE_SUBJECT,
  FIND_SUBJECT,
  SUBJECT_LOADED_FAIL,
  SUBJECT_LOADED_SUCCESS,
  UPDATE_SUBJECT,
} from "../contexts/constants";

export const subjectReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUBJECT_LOADED_SUCCESS:
      return {
        ...state,
        subjects: payload,
        subjectLoading: false,
      };
    case SUBJECT_LOADED_FAIL:
      return {
        ...state,
        subjects: [],
        subjectLoading: false,
      };
    case ADD_SUBJECT:
      return {
        ...state,
        subjects: [...state.subjects, payload],
      };
    case DELETE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.filter((mon) => mon._id === payload),
      };
    case FIND_SUBJECT:
      return {
        ...state,
        monhoc: payload,
      };
    case UPDATE_SUBJECT:
      const newSubject = state.subjects.map((mon) =>
        mon._id === payload._id ? payload : mon
      );
      return {
        ...state,
        subjects: newSubject,
      };
    default:
      return state;
  }
};
