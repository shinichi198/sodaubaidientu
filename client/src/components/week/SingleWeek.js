import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtonsWeek from "./ActionButtonsWeek";

const SingleClass = ({ tuan: { _id, name, startDate, endDate } }) => {
  return (
    <Card className="shadow my-4" border="success">
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{name}</p>
            </Col>
            <Col className="text-right">
              <ActionButtonsWeek _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>
          Từ ngày:&nbsp;
          <Badge variant="success">
            {new Date(startDate).toLocaleDateString()}
          </Badge>
          &nbsp;&nbsp;đến ngày:&nbsp;
          <Badge variant="success">
            {new Date(endDate).toLocaleDateString()}
          </Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleClass;
