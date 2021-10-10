import { createContext, useReducer } from "react";
import { yearReducer } from "../reducers/yearReducer";
import { apiUrl, YEAR_LOADED_FAIL, YEAR_LOADED_SUCCESS } from "./constants";
import axios from "axios";

export const YearContext = createContext();
const YearContextProvider = ({ children }) => {
  const [yearState, dispatch] = useReducer(yearReducer, {
    years: [],
    yearLoading: true,
  });
  const getYear = async () => {
    try {
      const res = await axios.get(`${apiUrl}/years`);
      if (res.data.success)
        dispatch({ type: YEAR_LOADED_SUCCESS, payload: res.data.year });
    } catch (err) {
      dispatch({ type: YEAR_LOADED_FAIL });
    }
  };
  const yearContextData = {
    yearState,
    getYear,
  };

  return (
    <YearContext.Provider value={yearContextData}>
      {children}
    </YearContext.Provider>
  );
};

export default YearContextProvider;
