import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { YearContext } from "../../contexts/YearContext";
import { WeekContext } from "../../contexts/WeekContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddWeekModal = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const handleCheckInDate = (date) => {
    setCheckInDate(date);

    setCheckOutDate(null);
  };
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };

  const { setShowAddWeekModal, showAddWeekModal, addWeek, setShowToast } =
    useContext(WeekContext);
  const {
    yearState: { years },
    getYear,
  } = useContext(YearContext);
  const [newWeek, setNewWeek] = useState({
    name: "",
    startDate: "",
    endDate: "",
    year: "",
  });
  useEffect(() => {
    getYear();
  }, []);
  const { name, startDate, endDate, year } = newWeek;
  const onChangeNewWeekForm = (event) => {
    setNewWeek({
      ...newWeek,
      [event.target.name]: event.target.value,
      startDate: checkInDate,
      endDate: checkOutDate,
    });
  };
  const closeDialog = () => {
    resetAddWeekData();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addWeek(newWeek);
    //console.log(newWeek.startDate);
    resetAddWeekData();
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };
  const resetAddWeekData = () => {
    setNewWeek({ name: "", startDate: "", endDate: "", year: "" });
    setShowAddWeekModal(false);
  };
  return (
    <Modal show={showAddWeekModal} onHide={closeDialog}>
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
              onChange={onChangeNewWeekForm}
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
              onChange={onChangeNewWeekForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Bắt đầu từ ngày:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            </Form.Label>
            <DatePicker
              selected={checkInDate}
              minDate={new Date()}
              onChange={handleCheckInDate}
            />
            {/* <Form.Control
              type="date"
              custom
              onChange={onChangeNewWeekForm}
              name="startDate"
              value={startDate}
            /> */}
          </Form.Group>
          <Form.Group>
            <Form.Label>Kết thúc vào ngày:&nbsp;&nbsp; </Form.Label>
            <DatePicker
              selected={checkOutDate}
              minDate={checkInDate}
              onChange={handleCheckOutDate}
            />
            {/* <Form.Control
              type="date"
              custom
              onChange={onChangeNewWeekForm}
              name="endDate"
              value={endDate}
            /> */}
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

export default AddWeekModal;
