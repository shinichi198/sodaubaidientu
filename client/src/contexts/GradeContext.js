import axios from "axios";
import { createContext, useReducer } from "react";
import { gradeReducer } from "../reducers/gradeReducer";
import { apiUrl, GRADE_LOADED_FAIL, GRADE_LOADED_SUCCESS } from "./constants";

export const GradeContext = createContext();
const GradeContextProvider = ({ children }) => {
  //State
  const [gradeState, dispatch] = useReducer(gradeReducer, {
    grades: [],
    gradeLoading: true,
  });
  //Get All Grade

  const getGrade = async () => {
    try {
      const res = await axios.get(`${apiUrl}/grades`);
      if (res.data.success) {
        dispatch({
          type: GRADE_LOADED_SUCCESS,
          payload: res.data.grade,
        });
      }
    } catch (err) {
      dispatch({ type: GRADE_LOADED_FAIL });
    }
  };

  const gradeContextData = {
    gradeState,
    getGrade,
  };

  return (
    <GradeContext.Provider value={gradeContextData}>
      {children}
    </GradeContext.Provider>
  );
};
export default GradeContextProvider;
