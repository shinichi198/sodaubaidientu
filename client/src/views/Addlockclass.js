import { useContext, useEffect, useState } from "react";
import { ClassContext } from "../contexts/ClassContext";
import { GradeContext } from "../contexts/GradeContext";
import { WeekContext } from "../contexts/WeekContext";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import NotFound from "../components/layout/NotFound";
import Form from "react-bootstrap/Form";
import { LockclassContext } from "../contexts/LockclassContext";
const Addlockclass = () => {
  const {
    authState: {
      user: { role },
    },
  } = useContext(AuthContext);

  const {
    classState: { classs },
    getClasss,
  } = useContext(ClassContext);
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
    setShowToast,
    addListLockClass,
    showToast: { show, message, type },
  } = useContext(LockclassContext);
  const [newGrade, setNewGrade] = useState({
    week: "",
    khoi: "",
  });
  //Start: Get all class
  useEffect(() => {
    getClasss();
    getLockClass(newGrade.week);
    getWeeks();
    getGrade();
  }, []);
  const [lockclass, setLockclass] = useState([]);
  const [lockLop, setLockLop] = useState({
    List: lockclasss,
    MasterCheked: false,
    SelectedList: [],
  });
  const addmang = () => {
    setLockclass([]);
    const tmp = classs.filter((db) => db.grade === khoi);
    for (var i = 0; i < tmp.length; i++) {
      const tp = {
        lophoc: tmp[i]._id,
        week: newGrade.week,
        grade: newGrade.khoi,
        selected: false,
      };
      setLockclass((lockclass) => [...lockclass, tp]);
    }
  };
  useEffect(() => {
    addmang();
    // if (lockclasss)
    //   setLockLop({
    //     List: lockclasss.filter((db) => db.grade === khoi),
    //   });
  }, [newGrade.khoi]);
  //console.log(lockclass);
  const onItemCheck = (e, lop) => {
    console.log(lop._id, "-", e.target.checked);
  };
  let body = null;
  if (lockclassLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  const { khoi } = newGrade;
  const onChangeForm = (event) => {
    setNewGrade({ ...newGrade, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    for (var i = 0; i < lockclass.length; i++) {
      const { success, message } = await addListLockClass(lockclass[i]);
      setShowToast({
        show: true,
        message: message,
        type: success ? "success" : "danger",
      });
    }
  };
  if (role !== "superadmin") return <NotFound />;
  return (
    <div style={{ paddingLeft: "40%" }}>
      <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
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
          </Form.Group>
          <Form.Group>
            <Form.Control as="button" className="btn btn-success">
              Cap nhat
            </Form.Control>
          </Form.Group>
        </Form>
      </Row>
      {/* {body} */}
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

export default Addlockclass;
