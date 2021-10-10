import Button from "react-bootstrap/Button";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { SubjectContext } from "../../contexts/SubjectContext";
import { useContext } from "react";
const ActionButtons = ({ _id }) => {
  const { deleteSubject, findSubject, setShowUpdateSubjectModal } =
    useContext(SubjectContext);
  const chooseSubject = (subjectId) => {
    findSubject(subjectId);
    setShowUpdateSubjectModal(true);
  };
  return (
    <>
      <Button className="post-button" onClick={chooseSubject.bind(this, _id)}>
        <img src={editIcon} alt="Edit" width="24" height="24" />
      </Button>
      <Button className="post-button" onClick={deleteSubject.bind(this, _id)}>
        <img src={deleteIcon} alt="Delete" width="24" height="24" />
      </Button>
    </>
  );
};

export default ActionButtons;
