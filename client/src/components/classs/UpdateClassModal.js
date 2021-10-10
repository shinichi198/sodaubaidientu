import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import { GradeContext } from "../../contexts/GradeContext";
import { YearContext } from "../../contexts/YearContext";
const UpdateClassModal = () => {
  const {
    classState: { lophoc },
    updateClassModal,
    setUpdateClassModal,
    updateClass,
    setShowToast,
  } = useContext(ClassContext);
  //State
  const {
    gradeState: { grades },
  } = useContext(GradeContext);
  const {
    yearState: { years },
  } = useContext(YearContext);
  const [updatedClass, setUpdatedClass] = useState(lophoc);
  useEffect(() => {
    setUpdatedClass(lophoc);
  }, [lophoc]);
  const { name, grade, year } = updatedClass;
  const onChangeUpadteClassForm = (event) => {
    setUpdatedClass({
      ...updatedClass,
      [event.target.name]: event.target.value,
    });
  };
  const closeDialog = () => {
    setUpdatedClass(lophoc);
    resetAddClassData();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateClass(updatedClass);
    resetAddClassData();
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };

  const resetAddClassData = () => {
    setUpdateClassModal(false);
  };
  return (
    <Modal show={updateClassModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Sửa thông tin lớp học</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              as="select"
              value={year}
              custom
              onChange={onChangeUpadteClassForm}
              name="year"
            >
              <option>Chọn năm học</option>
              {years.map((khoi) => (
                <option key={khoi._id} value={khoi._id}>
                  {khoi.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={grade}
              custom
              onChange={onChangeUpadteClassForm}
              name="grade"
            >
              <option>Chọn khối</option>
              {grades.map((khoi) => (
                <option key={khoi._id} value={khoi._id}>
                  {khoi.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="name"
              name="name"
              required
              aria-describedby="title-help"
              value={name}
              onChange={onChangeUpadteClassForm}
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
            Cập nhật
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateClassModal;
