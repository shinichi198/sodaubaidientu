import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtonsSubject from "./ActionButtonsSubject";
const SingleSubject = ({ mon: { _id, name } }) => {
  return (
    <Card className="shadow my-4" border="success">
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <Badge variant="success">{name}</Badge>
            </Col>
            <Col className="text-right">
              <ActionButtonsSubject _id={_id} />
            </Col>
          </Row>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SingleSubject;
