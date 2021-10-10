import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { SubjectContext } from "../../contexts/SubjectContext";
const AddSubjectModal = () => {
  const {
    setShowAddSubjectModal,
    showAddSubjectModal,
    addSubject,
    setShowToast,
  } = useContext(SubjectContext);
  const [newSubject, setNewSubject] = useState({
    name: "",
  });
  const { name } = newSubject;
  const onChangeNewSubjectForm = (event) =>
    setNewSubject({ ...newSubject, [event.target.name]: event.target.value });
  const closeDialog = () => {
    resetAddSubjectData();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addSubject(newSubject);
    resetAddSubjectData();
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };
  const resetAddSubjectData = () => {
    setNewSubject({ name: "" });
    setShowAddSubjectModal(false);
  };
  return (
    <Modal show={showAddSubjectModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Bạn muốn tạo mới lớp học</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="name"
              name="name"
              required
              aria-describedby="title-help"
              value={name}
              onChange={onChangeNewSubjectForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Tạo
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddSubjectModal;
