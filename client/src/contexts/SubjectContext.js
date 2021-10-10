import { createContext, useReducer, useState } from "react";
import { subjectReducer } from "../reducers/subjectReducer";
import {
  ADD_SUBJECT,
  apiUrl,
  DELETE_SUBJECT,
  FIND_SUBJECT,
  SUBJECT_LOADED_FAIL,
  SUBJECT_LOADED_SUCCESS,
  UPDATE_SUBJECT,
} from "./constants";
import axios from "axios";
export const SubjectContext = createContext();
const SubjectContextProvider = ({ children }) => {
  const [subjectState, dispatch] = useReducer(subjectReducer, {
    monhoc: null,
    subjects: [],
    subjectLoading: true,
  });
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showUpdateSubjectModal, setShowUpdateSubjectModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const getSubject = async () => {
    try {
      const res = await axios.get(`${apiUrl}/subjects`);
      if (res.data.success) {
        dispatch({
          type: SUBJECT_LOADED_SUCCESS,
          payload: res.data.subject,
        });
      }
    } catch (err) {
      dispatch({ type: SUBJECT_LOADED_FAIL });
    }
  };
  const addSubject = async (newSubject) => {
    try {
      const res = await axios.post(`${apiUrl}/subjects`, newSubject);
      if (res.data.success) {
        dispatch({ type: ADD_SUBJECT, payload: res.data.subject });
        return res.data;
      }
    } catch (err) {
      return { success: false, message: "Lỗi máy chủ" };
    }
  };
  const deleteSubject = async (subjectId) => {
    try {
      const res = await axios.delete(`${apiUrl}/subjects/${subjectId}`);
      if (res.data.subject) {
        dispatch({ type: DELETE_SUBJECT, payload: subjectId });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const findSubject = async (subjectId) => {
    const subject = subjectState.subjects.find((mon) => mon._id === subjectId);
    dispatch({ type: FIND_SUBJECT, payload: subject });
  };
  const updateSubject = async (updatedSubject) => {
    try {
      const res = await axios.put(
        `${apiUrl}/subjects/${updatedSubject._id}`,
        updatedSubject
      );
      if (res.data.success) {
        dispatch({ type: UPDATE_SUBJECT, payload: res.data.subject });
        return res.data;
      }
    } catch (err) {
      return err.res.data
        ? err.res.data
        : { success: false, message: "Lỗi máy chủ" };
    }
  };
  const subjectContextData = {
    subjectState,
    getSubject,
    showAddSubjectModal,
    setShowAddSubjectModal,
    addSubject,
    showToast,
    setShowToast,
    deleteSubject,
    findSubject,
    updateSubject,
    showUpdateSubjectModal,
    setShowUpdateSubjectModal,
  };
  return (
    <SubjectContext.Provider value={subjectContextData}>
      {children}
    </SubjectContext.Provider>
  );
};
export default SubjectContextProvider;
