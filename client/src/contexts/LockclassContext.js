import { createContext, useReducer, useState } from "react";
import { lockclassReducer } from "../reducers/lockclassReducer";
import {
  ADD_LOCKCLASS,
  apiUrl,
  DELETE_LOCKCLASS,
  LOCKCLASS_LOADED_FAIL,
  LOCKCLASS_LOADED_SUCCESS,
  UPDATE_LOCKCLASS,
} from "./constants";
import axios from "axios";

export const LockclassContext = createContext();
const LockclassContextProvider = ({ children }) => {
  const [lockclassState, dispatch] = useReducer(lockclassReducer, {
    lockclass: null,
    lockclasss: [],
    lockclassLoading: true,
  });
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const getLockClass = async (idLock) => {
    try {
      const res = await axios.get(`${apiUrl}/lockclass/${idLock}`);
      if (res.data.success) {
        dispatch({
          type: LOCKCLASS_LOADED_SUCCESS,
          payload: res.data.lockclass,
        });
      }
    } catch (err) {
      dispatch({ type: LOCKCLASS_LOADED_FAIL });
    }
  };
  const getAllLockClass = async () => {
    try {
      const res = await axios.get(`${apiUrl}/lockclass`);
      if (res.data.success) {
        dispatch({
          type: LOCKCLASS_LOADED_SUCCESS,
          payload: res.data.lockclass,
        });
      }
    } catch (err) {
      dispatch({ type: LOCKCLASS_LOADED_FAIL });
    }
  };

  const addListLockClass = async (newLockClass) => {
    try {
      const res = await axios.post(`${apiUrl}/lockclass`, newLockClass);
      return res.data;
    } catch (err) {
      // return err.res.data
      //   ? err.res.data
      return { success: false, message: "Loi may chu" };
    }
  };

  const addLockClass = async (newLockClass) => {
    // console.log(newLockClass);
    try {
      const res = await axios.post(`${apiUrl}/lockclass`, newLockClass);
      if (res.data.success) {
        dispatch({
          type: ADD_LOCKCLASS,
          payload: res.data.lockclass,
        });
        return res.data;
      }
    } catch (err) {
      // return err.res.data
      //   ? err.res.data
      return { success: false, message: "Loi may chu" };
    }
  };

  const deleteLockclass = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/lockclass/${id}`);
      if (res.data.success) {
        dispatch({
          type: DELETE_LOCKCLASS,
          payload: id,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateLockclass = async (updatedLockclass) => {
    try {
      const res = await axios.put(
        `${apiUrl}/lockclass/${updatedLockclass._id}`,
        updatedLockclass
      );
      if (res.data.success) {
        //dispatch({ type: UPDATE_LOCKCLASS, payload: res.data.lockclasss });
        return res.data;
      }
    } catch (err) {
      return { success: false, message: "Loi may chu" };
    }
  };
  const lockclassContextData = {
    getLockClass,
    addLockClass,
    showToast,
    setShowToast,
    deleteLockclass,
    lockclassState,
    addListLockClass,
    updateLockclass,
    getAllLockClass,
  };

  return (
    <LockclassContext.Provider value={lockclassContextData}>
      {children}
    </LockclassContext.Provider>
  );
};

export default LockclassContextProvider;
