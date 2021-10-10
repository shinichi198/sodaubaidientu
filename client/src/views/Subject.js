import { useContext, useEffect } from "react";
import { SubjectContext } from "../contexts/SubjectContext";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../contexts/AuthContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import addIcon from "../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import SingleSubject from "../components/subject/SingleSubject";
import AddSubjectModal from "../components/subject/AddSubjectModal";
import UpdateSubjectModal from "../components/subject/UpdateSubjectModal";
import NotFound from "../components/layout/NotFound";
const Subject = () => {
  const {
    authState: {
      user: { username, role },
    },
  } = useContext(AuthContext);
  const {
    subjectState: { monhoc, subjects, subjectLoading },
    getSubject,
    setShowAddSubjectModal,
    setShowToast,
    showToast: { show, message, type },
  } = useContext(SubjectContext);
  useEffect(() => {
    getSubject();
  }, []);
  let body = null;
  if (subjectLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (subjects.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1"> Xin chào {username}</Card.Header>
          <Card.Body>
            <Card.Title>
              {" "}
              Chào mừng bạn đến với "SỔ ĐẦU BÀI ĐIỆN TỬ - TRƯỜNG THPT NGHÈN"
            </Card.Title>
            <Card.Text>Hãy bấm vào nút bên dưới để thêm Môn học</Card.Text>
            <Button variant="primary">Tạo môn học</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {subjects.map((mon) => (
            <Col key={mon._id} className="my2">
              <SingleSubject mon={mon} />
            </Col>
          ))}
        </Row>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Thêm Môn học</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddSubjectModal.bind(this, true)}
          >
            <img src={addIcon} alt="Thêm môn học" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }
  if (role !== "admin") return <NotFound />;
  return (
    <div>
      {body}
      <AddSubjectModal />
      {monhoc !== null && <UpdateSubjectModal />}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bt-${type} text-white`}
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
export default Subject;
