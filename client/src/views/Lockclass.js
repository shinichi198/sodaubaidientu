import { useContext, useEffect, useState } from "react";
// import { ClassContext } from "../contexts/ClassContext";
import { GradeContext } from "../contexts/GradeContext";
import { WeekContext } from "../contexts/WeekContext";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../contexts/AuthContext";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import SingleClass from "../components/classs/SingleClass";
// import addIcon from "../assets/plus-circle-fill.svg";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import NotFound from "../components/layout/NotFound";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { LockclassContext } from "../contexts/LockclassContext";
const Lockclass = () => {
  const {
    authState: {
      user: { role },
    },
  } = useContext(AuthContext);

  // const {
  //   classState: { classs, classLoading },
  //   getClasss,
  // } = useContext(ClassContext);
  const {
    gradeState: { grades },
    getGrade,
  } = useContext(GradeContext);
  const {
    weekState: { weeks },
    getWeeks,
  } = useContext(WeekContext);
  const {
    lockclassState: { lockclasss, lockclassLoading },
    getLockClass,
    updateLockclass,
    setShowToast,
    showToast: { show, message, type },
  } = useContext(LockclassContext);
  const [newGrade, setNewGrade] = useState({
    week: "",
    khoi: "",
  });
  //Start: Get all class
  useEffect(() => {
    // getClasss();
    getWeeks();
    getGrade();
  }, []);

  const [lockLop, setLockLop] = useState({
    List: [],
    MasterCheked: false,
    SelectedList: [],
  });
  useEffect(() => {
    if (newGrade.week) getLockClass(newGrade.week);

    setLockLop({
      List: lockclasss.filter(
        (db) => db.grade === newGrade.khoi && db.week === newGrade.week
      ),
    });
  }, [newGrade.khoi, newGrade.week]);

  const onMasterCheck = (e) => {
    let tempList = lockLop.List;
    tempList.map((lop) => (lop.selected = e.target.checked));

    setLockLop({
      MasterCheked: e.target.checked,
      List: tempList,
      SelectedList: lockLop.List.filter((e) => e.selected),
    });
  };

  const onItemCheck = (e, lop) => {
    let tempList = lockLop.List;
    tempList.map((item) => {
      if (item._id === lop._id) {
        lop.selected = e.target.checked;
      }
      return lop;
    });
    const totalItems = lockLop.List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    setLockLop({
      MasterCheked: totalItems === totalCheckedItems,
      List: tempList,
      SelectedList: lockLop.List.filter((e) => e.selected),
    });
  };
  let body = null;
  if (lockclassLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    body = (
      <>
        <Table responsive="sm" className="mx-4 border">
          <thead>
            <tr>
              <th>#</th>
              <th>Lớp</th>
              <th>
                <input
                  type="checkbox"
                  id="mastercheck"
                  checked={lockLop.MasterCheked}
                  onChange={(e) => onMasterCheck(e)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {lockLop &&
              lockLop.List.map((lop, index) => (
                <tr key={lop._id}>
                  <td>{index + 1}</td>
                  <td>{lop._class.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={lop.selected}
                      id={`rowcheck${lop._id}`}
                      onChange={(e) => onItemCheck(e, lop)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </>
    );
  }
  // const { week, khoi } = newGrade;
  const onChangeForm = (event) => {
    setNewGrade({ ...newGrade, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    for (var i = 0; i < lockLop.List.length; i++) {
      const { success, message } = await updateLockclass(lockLop.List[i]);
      setShowToast({
        show: true,
        message: message,
        type: success ? "success" : "danger",
      });
    }
  };
  if (role !== "admin") return <NotFound />;
  return (
    <div>
      <Row className="row-cols-1 row-cols-md-2 g-4 mx-auto mt-3">
        <Form onSubmit={onSubmit}>
          <Form.Group
            style={{
              display: "flex",
              alignItems: "center",
              margin: "5px",
            }}
          >
            <Form.Control as="select" name="week" onChange={onChangeForm}>
              <option value="">Chọn Tuần</option>
              {weeks.map((khoi) => (
                <option key={khoi._id} value={khoi._id}>
                  {khoi.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control as="select" name="khoi" onChange={onChangeForm}>
              <option value="">Chọn khối</option>
              {grades.map((khoi) => (
                <option key={khoi._id} value={khoi._id}>
                  {khoi.name}
                </option>
              ))}
            </Form.Control>
            {/* <Form.Control as="button" className="btn btn-success">
              Tìm kiếm
            </Form.Control> */}
            <Form.Control as="button" className="btn btn-success">
              Lưu
            </Form.Control>
          </Form.Group>
        </Form>
      </Row>
      {body}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default Lockclass;
