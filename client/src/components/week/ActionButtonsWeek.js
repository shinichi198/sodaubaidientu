import Button from "react-bootstrap/Button";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { WeekContext } from "../../contexts/WeekContext";
import { useContext } from "react";
const ActionButtonsWeek = ({ _id }) => {
  const { deleteWeek, findWeek, setShowUpdateWeekModal } =
    useContext(WeekContext);
  const chooseWeek = (weekId) => {
    findWeek(weekId);
    setShowUpdateWeekModal(true);
  };
  return (
    <>
      <Button className="post-button" onClick={chooseWeek.bind(this, _id)}>
        <img src={editIcon} alt="Edit" width="24" height="24" />
      </Button>
      <Button className="post-button" onClick={deleteWeek.bind(this, _id)}>
        <img src={deleteIcon} alt="Delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtonsWeek;
