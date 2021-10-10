import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { YearContext } from "../../contexts/YearContext";
import { WeekContext } from "../../contexts/WeekContext";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
const UpdateWeekModal = () => {
  const {
    weekState: { week },
    setShowUpdateWeekModal,
    showUpdateWeekModal,
    updateWeek,
    setShowToast,
  } = useContext(WeekContext);
  const {
    yearState: { years },
    getYear,
  } = useContext(YearContext);
  const [updatedWeek, setUpdatedWeek] = useState(week);
  useEffect(() => {
    getYear();
    setUpdatedWeek(week);
  }, [week]);
  const { name, startDate, endDate, year } = updatedWeek;
  const onChangeUpdateWeekForm = (event) =>
    setUpdatedWeek({ ...updatedWeek, [event.target.name]: event.target.value });
  const closeDialog = () => {
    resetAddWeekData();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateWeek(updatedWeek);
    resetAddWeekData();
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };
  const resetAddWeekData = () => {
    //setNewWeek({ name: "", startDate: "", endDate: "", year: "" });
    setShowUpdateWeekModal(false);
  };
  return (
    <Modal show={showUpdateWeekModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Bạn muốn tạo mới Tuần</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              as="select"
              value={year}
              custom
              onChange={onChangeUpdateWeekForm}
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
              type="text"
              placeholder="Tên tuần"
              name="name"
              required
              aria-describedby="title-help"
              value={name}
              onChange={onChangeUpdateWeekForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Bắt đầu từ ngày:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </Form.Label>
            <Form.Control
              type="date-local"
              custom
              onChange={onChangeUpdateWeekForm}
              name="startDate"
              value={new Date(startDate).toLocaleDateString("en-US")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Kết thúc vào ngày:&nbsp;&nbsp; </Form.Label>
            <Form.Control
              type="date-local"
              custom
              onChange={onChangeUpdateWeekForm}
              name="endDate"
              // selected={new Date(endDate).toLocaleDateString()}
              value={new Date(endDate).toLocaleDateString("en-US")}
            />
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

export default UpdateWeekModal;
