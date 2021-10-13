import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useState, useEffect } from "react";
import { SubjectContext } from "../../contexts/SubjectContext";
import { GradeContext } from "../../contexts/GradeContext";
import { DashboardContext } from "../../contexts/DashboardContext";
import { AuthContext } from "../../contexts/AuthContext";
const AddDashboardModal = () => {
  const {
    dashboardState: { khoi, week, lophoc },
    setShowAddDashboardModal,
    showAddDashboardModal,
    addToprecoder,
    setShowToast,
  } = useContext(DashboardContext);
  const [newGrade, setNewGrade] = useState({
    khoi: khoi,
    lophoc: lophoc,
    week: week,
  });
  useEffect(() => {
    setNewGrade({ khoi: khoi, lophoc: lophoc, week: week });
  }, [lophoc, khoi, week]);
  const rows = [];
  for (var i = 1; i < 250; i++) {
    rows.push(i);
  }
  const diems = [
    1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
  ];
  const thus = [
    {
      day_code: 1,
      day_name: "Chủ nhật",
    },
    {
      day_code: 2,
      day_name: "Thứ 2",
    },
    {
      day_code: 3,
      day_name: "Thứ 3",
    },
    {
      day_code: 4,
      day_name: "Thứ 4",
    },
    {
      day_code: 5,
      day_name: "Thứ 5",
    },
    {
      day_code: 6,
      day_name: "Thứ 6",
    },
    {
      day_code: 0,
      day_name: "Thứ 7",
    },
  ];
  //State
  const {
    gradeState: {},
    getGrade,
  } = useContext(GradeContext);
  const {
    authState: {
      user: { _id },
    },
  } = useContext(AuthContext);
  const {
    subjectState: { subjects },
    getSubject,
  } = useContext(SubjectContext);

  const [newDashboard, setNewDashboard] = useState({
    thu: "",
    ngay: "",
    cahoc: "",
    tiet: "",
    subject: "",
    tietCT: "",
    tenbai: "",
    nhanxet: "",
    xeploai: "",
    hocsinh: "",
    grade: newGrade.khoi,
    lophoc: newGrade.lophoc,
    week: newGrade.week,
    user: _id,
  });
  useEffect(() => {
    setNewDashboard({
      ...newDashboard,
      grade: newGrade.khoi,
      lophoc: newGrade.lophoc,
      week: newGrade.week,
    });
  }, [lophoc, week, khoi, showAddDashboardModal]);
  // console.log(newDashboard);
  useEffect(() => {
    getGrade();
    getSubject();
  }, []);
  //const { name, grade, year } = newDashboard;
  const onChangeNewDashboardForm = (event) => {
    setNewDashboard({
      ...newDashboard,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    const d = new Date(newDashboard.ngay);
    const current_day = d.getDay();
    setNewDashboard({ ...newDashboard, thu: current_day });
  }, [newDashboard.ngay]);
  const closeDialog = () => {
    resetAddDashboardData();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addToprecoder(newDashboard);
    resetAddDashboardData();
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };
  //console.log("Tuan:", week, " ", khoi, " ", lophoc);
  const resetAddDashboardData = () => {
    setNewDashboard({
      thu: "",
      ngay: "",
      cahoc: "",
      tiet: "",
      subject: "",
      tietCT: "",
      tenbai: "",
      nhanxet: "",
      xeploai: "",
      hocsinh: "",
      grade: "",
      lophoc: "",
      week: "",
      user: _id,
    });
    setShowAddDashboardModal(false);
  };
  const { tenbai, nhanxet, hocsinh } = newDashboard;
  return (
    <Modal show={showAddDashboardModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Bạn muốn tạo mới Tiết học</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="date"
              name="ngay"
              required
              onChange={onChangeNewDashboardForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              name="cahoc"
              required
              onChange={onChangeNewDashboardForm}
            >
              <option value="">Chọn ca học</option>
              <option value="0">Buổi sáng</option>
              <option value="1">Buổi chiều</option>
              <option value="2">Buổi tối</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              name="tiet"
              onChange={onChangeNewDashboardForm}
              required
            >
              <option value="">Chọn tiết theo TKB</option>
              <option value="1">Tiết 1</option>
              <option value="2">Tiết 2</option>
              <option value="3">Tiết 3</option>
              <option value="4">Tiết 4</option>
              <option value="5">Tiết 5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              custom
              onChange={onChangeNewDashboardForm}
              name="subject"
              required
            >
              <option value="">Chọn Môn học</option>
              {subjects.map((khoi) => (
                <option key={khoi._id} value={khoi._id}>
                  {khoi.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              custom
              onChange={onChangeNewDashboardForm}
              name="tietCT"
              required
            >
              <option value="">Tiết theo PPCT</option>
              {rows.map((khoi) => (
                <option key={khoi} value={khoi}>
                  {khoi}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Tên học sinh nghỉ tiết"
              name="hocsinh"
              aria-describedby="title-help"
              value={hocsinh}
              onChange={onChangeNewDashboardForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Tên bài, nội dung công việc"
              name="tenbai"
              required
              aria-describedby="title-help"
              value={tenbai}
              onChange={onChangeNewDashboardForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Nhận xét của giáo viên"
              name="nhanxet"
              required
              aria-describedby="title-help"
              value={nhanxet}
              onChange={onChangeNewDashboardForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              custom
              onChange={onChangeNewDashboardForm}
              name="xeploai"
            >
              <option value="">Xếp loại giờ học</option>
              {diems.map((khoi) => (
                <option key={khoi} value={khoi}>
                  {khoi}
                </option>
              ))}
            </Form.Control>
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

export default AddDashboardModal;
