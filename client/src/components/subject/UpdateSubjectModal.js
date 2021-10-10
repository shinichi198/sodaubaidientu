import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { SubjectContext } from "../../contexts/SubjectContext";

const UpdateSubjectModal = () => {
  const {
    subjectState: { monhoc },
    showUpdateSubjectModal,
    setShowUpdateSubjectModal,
    updateSubject,
    setShowToast,
  } = useContext(SubjectContext);
  const [updatedSubject, setUpdatedSubject] = useState(monhoc);
  useEffect(() => {
    setUpdatedSubject(monhoc);
  }, [monhoc]);
  const { name } = updatedSubject;
  const onChangeUpdateSubjectForm = (event) => {
    setUpdatedSubject({
      ...updatedSubject,
      [event.target.name]: event.target.value,
    });
  };
  const closeDialog = () => {
    setUpdatedSubject(monhoc);
    resetAddSubjectData();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateSubject(updatedSubject);
    resetAddSubjectData();
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };
  const resetAddSubjectData = () => {
    setShowUpdateSubjectModal(false);
  };
  return (
    <Modal show={showUpdateSubjectModal} onHide={closeDialog}>
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
              onChange={onChangeUpdateSubjectForm}
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
            Cập nhật môn học
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateSubjectModal;
