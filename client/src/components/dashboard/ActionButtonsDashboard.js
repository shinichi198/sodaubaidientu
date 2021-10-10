import Button from "react-bootstrap/Button";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { DashboardContext } from "../../contexts/DashboardContext";
import { useContext } from "react";

const ActionButtonsDashboard = ({ _id }) => {
  const { deleteDashboard, findDashboard, setShowUpdateDashboardModal } =
    useContext(DashboardContext);
  const chooseSubject = (dashboardId) => {
    findDashboard(dashboardId);
    setShowUpdateDashboardModal(true);
  };
  return (
    <>
      {/* <Button className="post-button" onClick={chooseSubject.bind(this, _id)}>
        <img src={editIcon} alt="Edit" width="24" height="24" />
      </Button> */}
      <Button className="post-button" onClick={deleteDashboard.bind(this, _id)}>
        <img src={deleteIcon} alt="Delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtonsDashboard;
