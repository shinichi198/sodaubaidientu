import { createContext, useReducer, useState } from "react";
import { dashboardReducer } from "../reducers/dashboardReducer";
import {
  ADD_DASHBOARD,
  apiUrl,
  DASHBOARD_LOADED_FAIL,
  DASHBOARD_LOADED_SUCCESS,
  DELETE_DASHBOARD,
} from "./constants";
import axios from "axios";

export const DashboardContext = createContext();
const DashboardContextProvider = ({ children }) => {
  const [dashboardState, dispatch] = useReducer(dashboardReducer, {
    dashboard: null,
    dashboards: [],
    dashboardLoading: true,
  });
  const [showAddDashboardModal, setShowAddDashboardModal] = useState(false);
  const [showUpdateDashboardModal, setShowUpdateDashboardModal] =
    useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const getDashboards = async (id) => {
    try {
      const res = await axios.get(`${apiUrl}/dashboards/${id}`);
      if (res.data.success) {
        dispatch({
          type: DASHBOARD_LOADED_SUCCESS,
          payload: res.data.recoder,
        });
      }
    } catch (err) {
      dispatch({ type: DASHBOARD_LOADED_FAIL });
    }
  };

  const addToprecoder = async (newRecoder) => {
    try {
      const res = await axios.post(`${apiUrl}/dashboards`, newRecoder);
      if (res.data.success) {
        dispatch({ type: ADD_DASHBOARD, payload: res.data.dashboard });
        return res.data;
      }
    } catch (err) {
      // return err.res.data
      //   ? err.res.data
      //   : { success: false, message: "Lỗi máy chủ" };
      return { success: false, message: "Lỗi máy chủ" };
    }
  };

  //Delete
  const deleteDashboard = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/dashboards/${id}`);
      if (res.data.success) {
        dispatch({ type: DELETE_DASHBOARD, payload: id });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const dashboardContextData = {
    dashboardState,
    showAddDashboardModal,
    setShowAddDashboardModal,
    showUpdateDashboardModal,
    setShowUpdateDashboardModal,
    setShowToast,
    addToprecoder,
    showToast,
    getDashboards,
    deleteDashboard,
  };
  return (
    <DashboardContext.Provider value={dashboardContextData}>
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardContextProvider;
