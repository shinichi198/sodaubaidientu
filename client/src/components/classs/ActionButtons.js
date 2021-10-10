import Button from "react-bootstrap/Button";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { ClassContext } from "../../contexts/ClassContext";
import { useContext } from "react";
const ActionButtons = ({ _id }) => {
  const { deleteClass, findClass, setUpdateClassModal } =
    useContext(ClassContext);
  const chooseClass = (classId) => {
    findClass(classId);
    setUpdateClassModal(true);
  };
  return (
    <>
      <Button className="post-button" onClick={chooseClass.bind(this, _id)}>
        <img src={editIcon} alt="Edit" width="24" height="24" />
      </Button>
      <Button className="post-button" onClick={deleteClass.bind(this, _id)}>
        <img src={deleteIcon} alt="Delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtons;
