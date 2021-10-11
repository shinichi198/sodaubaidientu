import { useContext, useEffect } from "react";
import { ClassContext } from "../contexts/ClassContext";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../contexts/AuthContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SingleClass from "../components/classs/SingleClass";
import AddClassModal from "../components/classs/AddClassModal";
import addIcon from "../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import UpdateClassModal from "../components/classs/UpdateClassModal";
import NotFound from "../components/layout/NotFound";
const Class = () => {
  //Context
  const {
    authState: {
      user: { username, role },
    },
  } = useContext(AuthContext);

  const {
    classState: { lophoc, classs, classLoading },
    getClasss,
    setShowAddClassModal,
    setShowToast,
    showToast: { show, message, type },
  } = useContext(ClassContext);
  //Start: Get all class
  useEffect(() => {
    getClasss();
  }, []);

  let body = null;
  if (classLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (classs.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Xin chào {username}</Card.Header>
          <Card.Body>
            <Card.Title>Chào mừng bạn đến với "Sổ đầu bài điện tử"</Card.Title>
            <Card.Text>Hãy bấm vào nút bên dưới để thêm vào lớp học</Card.Text>
            <Button variant="primary">Tạo lớp</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {classs.map((lop) => (
            <Col key={lop._id} className="my2">
              <SingleClass lop={lop} />
            </Col>
          ))}
        </Row>
        {/* Open Add Class Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Thêm lớp học</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddClassModal.bind(this, true)}
          >
            <img src={addIcon} alt="Add" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }
  if (role !== "superadmin") return <NotFound />;
  return (
    <div>
      {body}
      <AddClassModal />
      {lophoc !== null && <UpdateClassModal />}
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

export default Class;
