import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import { GradeContext } from "../../contexts/GradeContext";
import { YearContext } from "../../contexts/YearContext";
const AddClassModal = () => {
  const { setShowAddClassModal, showAddClassModal, addClass, setShowToast } =
    useContext(ClassContext);
  //State
  const {
    gradeState: { grades },
    getGrade,
  } = useContext(GradeContext);
  const {
    yearState: { years },
    getYear,
  } = useContext(YearContext);
  const [newClass, setNewClass] = useState({
    name: "",
    grade: "",
    year: "",
  });
  useEffect(() => {
    getGrade();
    getYear();
  }, []);
  const { name, grade, year } = newClass;
  const onChangeNewClassForm = (event) =>
    setNewClass({ ...newClass, [event.target.name]: event.target.value });
  const closeDialog = () => {
    resetAddClassData();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addClass(newClass);
    resetAddClassData();
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };

  const resetAddClassData = () => {
    setNewClass({ name: "", grade: "", year: "" });
    setShowAddClassModal(false);
  };
  return (
    <Modal show={showAddClassModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Bạn muốn tạo mới lớp học</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              as="select"
              value={year}
              custom
              onChange={onChangeNewClassForm}
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
              onChange={onChangeNewClassForm}
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
              onChange={onChangeNewClassForm}
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

export default AddClassModal;
