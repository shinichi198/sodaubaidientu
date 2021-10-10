import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

const SingleClass = ({ lop: { _id, name, grade } }) => {
  return (
    <Card className="shadow my-4" border="success">
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{name}</p>
              <Badge variant="success">{name}</Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleClass;
