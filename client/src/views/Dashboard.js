import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import addIcon from "../assets/plus-circle-fill.svg";
import lockIcon from "../assets/lock.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";
import { ClassContext } from "../contexts/ClassContext";
import { WeekContext } from "../contexts/WeekContext";
import { GradeContext } from "../contexts/GradeContext";
import { DashboardContext } from "../contexts/DashboardContext";
import { LockclassContext } from "../contexts/LockclassContext";
import AddDashboardModal from "../components/dashboard/AddDashboardModal";
import SingleDashboard from "../components/dashboard/SingleDashboard";

const Dashboard = () => {
  // let time = new Date().getTime() + 86400000;
  // let object = new Date(time);
  // console.log(object);
  const {
    authState: {
      user: { _id },
    },
  } = useContext(AuthContext);
  const {
    weekState: { weeks },
    getWeeks,
  } = useContext(WeekContext);
  const {
    classState: { classs },
    getClasss,
  } = useContext(ClassContext);
  const {
    gradeState: { grades },
    getGrade,
  } = useContext(GradeContext);
  const {
    dashboardState: { dashboards },
    getDashboards,
    setShowAddDashboardModal,
    setShowToast,
    addThamso,
    showToast: { show, message, type },
  } = useContext(DashboardContext);

  const {
    lockclassState: { lockclasss },
    getAllLockClass,
  } = useContext(LockclassContext);

  useEffect(() => {
    getWeeks();
    getClasss();
    getGrade();
    getDashboards(_id);
    getAllLockClass();
  }, []);
  useEffect(() => {
    getDashboards(_id);
  }, []);
  let body = null;
  const [lockLop, setLockLop] = useState(false);
  const [newGrade, setNewGrade] = useState({
    week: "",
    khoi: "",
    lophoc: "",
  });
  const [newData, setNewData] = useState(null);
  const [newClass, setNewClass] = useState(null);

  useEffect(() => {
    const node = dashboards.filter((db) => {
      return db.week === newGrade.week && db.lophoc === newGrade.lophoc;
    });
    setNewData(node);
    const node2 = lockclasss.filter((db) => {
      return db.week === newGrade.week && db.lophoc === newGrade.lophoc;
    });
    if (node2.length > 0) setLockLop(node2[0].selected);
  }, [newGrade, dashboards]);

  useEffect(() => {
    const tmp = classs.filter((lop) => {
      return lop.grade === newGrade.khoi;
    });
    if (tmp) setNewClass(tmp);
  }, [newGrade.khoi]);

  const onChangeForm = (event) => {
    setNewGrade({ ...newGrade, [event.target.name]: event.target.value });
  };
  let { week, khoi, lophoc } = newGrade;
  useEffect(() => {
    addThamso(newGrade);
  }, [newGrade]);
  body = (
    <>
      <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
        {newData &&
          newData.map((lop) => (
            <Col key={lop._id} className="my2">
              <SingleDashboard lop={lop} check={lockLop} />
            </Col>
          ))}
      </Row>
      {/* Open Add Class Modal */}
      <OverlayTrigger
        placement="left"
        overlay={
          lockLop ? (
            <Tooltip>Sổ đầu bài đã bị khóa</Tooltip>
          ) : (
            <Tooltip>Thêm Tiết học</Tooltip>
          )
        }
      >
        <Button
          className="btn-floating"
          onClick={setShowAddDashboardModal.bind(this, true)}
          disabled={lockLop}
        >
          {lockLop ? (
            <img src={lockIcon} alt="Add" width="60" height="60" />
          ) : (
            <img src={addIcon} alt="Add" width="60" height="60" />
          )}
        </Button>
      </OverlayTrigger>
    </>
  );

  return (
    <>
      <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
        <Form>
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
                  {khoi.name} ({new Date(khoi.startDate).toLocaleDateString()} -{" "}
                  {new Date(khoi.endDate).toLocaleDateString()})
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
            <Form.Control as="select" name="lophoc" onChange={onChangeForm}>
              <option value="">Chọn lớp</option>
              {newClass &&
                newClass.map((lop) => (
                  <option key={lop._id} value={lop._id}>
                    {lop.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Row>
      {body}
      {week && khoi && lophoc && <AddDashboardModal />}
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
    </>
  );
};

export default Dashboard;
