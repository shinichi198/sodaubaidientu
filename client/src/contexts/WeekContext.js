import { createContext, useReducer, useState } from "react";
import { weekReducer } from "../reducers/weekReducer";
import {
  ADD_WEEK,
  apiUrl,
  DELETE_WEEK,
  FIND_WEEK,
  UPDATE_WEEK,
  WEEK_LOADED_FAIL,
  WEEK_LOADED_SUCCESS,
} from "./constants";
import axios from "axios";
export const WeekContext = createContext();
const WeekContextProvider = ({ children }) => {
  //State
  const [weekState, dispatch] = useReducer(weekReducer, {
    week: null,
    weeks: [],
    weekLoading: true,
  });
  const [showAddWeekModal, setShowAddWeekModal] = useState(false);
  const [showUpdateWeekModal, setShowUpdateWeekModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const getWeeks = async () => {
    try {
      const res = await axios.get(`${apiUrl}/weeks`);
      if (res.data.success) {
        dispatch({
          type: WEEK_LOADED_SUCCESS,
          payload: res.data.week,
        });
      }
    } catch (err) {
      dispatch({ type: WEEK_LOADED_FAIL });
    }
  };

  const addWeek = async (newWeek) => {
    try {
      const res = await axios.post(`${apiUrl}/weeks`, newWeek);
      console.log("ffff ", newWeek.startDate);
      if (res.data.success) {
        dispatch({ type: ADD_WEEK, payload: res.data.week });
        return res.data;
      }
    } catch (err) {
      return err.res.data
        ? err.res.data
        : { success: false, message: "Lỗi máy chủ" };
    }
  };

  const deleteWeek = async (weekId) => {
    try {
      const res = await axios.delete(`${apiUrl}/weeks/${weekId}`);
      if (res.data.success) {
        dispatch({ type: DELETE_WEEK, payload: weekId });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const findWeek = async (weekId) => {
    const week = weekState.weeks.find((tuan) => tuan._id === weekId);
    dispatch({ type: FIND_WEEK, payload: week });
  };

  const updateWeek = async (updatedWeek) => {
    try {
      const res = await axios.put(
        `${apiUrl}/weeks/${updatedWeek._id}`,
        updatedWeek
      );
      if (res.data.success) {
        dispatch({ type: UPDATE_WEEK, payload: res.data.week });
        return res.data;
      }
    } catch (err) {
      return err.res.data
        ? err.res.data
        : { success: false, message: "Lỗi máy chủ" };
    }
  };

  const weekContextData = {
    weekState,
    getWeeks,
    showUpdateWeekModal,
    setShowUpdateWeekModal,
    addWeek,
    showToast,
    setShowToast,
    deleteWeek,
    findWeek,
    updateWeek,
    showAddWeekModal,
    setShowAddWeekModal,
  };
  return (
    <WeekContext.Provider value={weekContextData}>
      {children}
    </WeekContext.Provider>
  );
};
export default WeekContextProvider;
