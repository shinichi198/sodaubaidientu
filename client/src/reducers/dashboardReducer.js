import {
  ADD_DASHBOARD,
  DASHBOARD_LOADED_FAIL,
  DASHBOARD_LOADED_SUCCESS,
  DELETE_DASHBOARD,
  FIND_DASHBOARD,
  UPDATE_DASHBOARD,
} from "../contexts/constants";

export const dashboardReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case DASHBOARD_LOADED_SUCCESS:
      return {
        ...state,
        dashboards: payload,
        dashboardLoading: false,
      };
    case DASHBOARD_LOADED_FAIL:
      return {
        ...state,
        dashboards: [],
        dashboardLoading: false,
      };
    case ADD_DASHBOARD:
      return {
        ...state,
        dashboards: [...state.dashboards, payload],
      };
    case DELETE_DASHBOARD:
      return {
        ...state,
        dashboards: state.dashboards.filter((db) => db._id !== payload),
      };
    case FIND_DASHBOARD:
      return {
        ...state,
        dashboard: payload,
      };
    case UPDATE_DASHBOARD:
      const newDashboard = state.dashboards.map((ds) =>
        ds._id === payload._id ? payload : ds
      );
      return {
        ...state,
        dashboards: newDashboard,
      };
    default:
      return state;
  }
};
