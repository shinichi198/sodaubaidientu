import { useContext, useEffect } from "react";
import { WeekContext } from "../contexts/WeekContext";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../contexts/AuthContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SingleWeek from "../components/week/SingleWeek";
import AddWeekModal from "../components/week/AddWeekModal";
import addIcon from "../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import UpdateWeekModal from "../components/week/UpdateWeekModal";
import NotFound from "../components/layout/NotFound";
const Week = () => {
  //Context
  const {
    authState: {
      user: { username, role },
    },
  } = useContext(AuthContext);

  const {
    weekState: { week, weeks, weekLoading },
    getWeeks,
    setShowAddWeekModal,
    setShowToast,
    showToast: { show, message, type },
  } = useContext(WeekContext);
  //Start: Get all class
  useEffect(() => {
    getWeeks();
  }, []);

  let body = null;
  if (weekLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (weeks.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Xin chào {username}</Card.Header>
          <Card.Body>
            <Card.Title>Chào mừng bạn đến với "Sổ đầu bài điện tử"</Card.Title>
            <Card.Text>Hãy bấm vào nút bên dưới để thêm vào Tuần</Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddWeekModal.bind(this, true)}
            >
              Tạo Tuần
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {weeks.map((tuan) => (
            <Col key={tuan._id} className="my2">
              <SingleWeek tuan={tuan} />
            </Col>
          ))}
        </Row>
        {/* Open Add Class Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Thêm mới Tuần học</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddWeekModal.bind(this, true)}
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
      <AddWeekModal />
      {week !== null && <UpdateWeekModal />}
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

export default Week;
