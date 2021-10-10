import { createContext, useReducer, useState } from "react";
import { classReducer } from "../reducers/classReducer";
import {
  ADD_CLASS,
  apiUrl,
  CLASS_LOADED_FAIL,
  CLASS_LOADED_SUCCESS,
  DELETE_CLASS,
  FIND_CLASS,
  UPDATE_CLASS,
} from "./constants";
import axios from "axios";

export const ClassContext = createContext();

const ClassContextProvider = ({ children }) => {
  //State
  const [classState, dispatch] = useReducer(classReducer, {
    lophoc: null,
    classs: [],
    classLoading: true,
  });

  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [updateClassModal, setUpdateClassModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });
  //Get all class
  const getClasss = async () => {
    try {
      const response = await axios.get(`${apiUrl}/lops`);
      if (response.data.success) {
        dispatch({
          type: CLASS_LOADED_SUCCESS,
          payload: response.data.class,
        });
      }
    } catch (err) {
      dispatch({ type: CLASS_LOADED_FAIL });
      //   return err.response.data
      //     ? err.response.data
      //     : { success: false, message: "Server errors" };
    }
  };

  //Add Class
  const addClass = async (newClass) => {
    try {
      const res = await axios.post(`${apiUrl}/lops`, newClass);
      if (res.data.success) {
        dispatch({ type: ADD_CLASS, payload: res.data.class });
        return res.data;
      }
    } catch (err) {
      return { success: false, message: "Server errors" };
    }
  };
  //Delete Class
  const deleteClass = async (classId) => {
    try {
      const res = await axios.delete(`${apiUrl}/lops/${classId}`);
      if (res.data.success) {
        dispatch({ type: DELETE_CLASS, payload: classId });
      }
    } catch (err) {
      console.log(err);
    }
  };
  //Find class when user is updating class
  const findClass = (classId) => {
    const lop = classState.classs.find((lop) => lop._id === classId);
    dispatch({ type: FIND_CLASS, payload: lop });
  };
  //Update Class
  const updateClass = async (updatedClass) => {
    try {
      const res = await axios.put(
        `${apiUrl}/lops/${updatedClass._id}`,
        updatedClass
      );
      if (res.data.success) {
        dispatch({ type: UPDATE_CLASS, payload: res.data.class });
        return res.data;
      }
    } catch (err) {
      return err.res.data
        ? err.res.data
        : { success: false, message: "Server errors" };
    }
  };
  //Class
  const classContextData = {
    classState,
    getClasss,
    showAddClassModal,
    setShowAddClassModal,
    addClass,
    showToast,
    setShowToast,
    deleteClass,
    findClass,
    updateClass,
    updateClassModal,
    setUpdateClassModal,
  };
  return (
    <ClassContext.Provider value={classContextData}>
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
