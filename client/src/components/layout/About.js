import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <Row className="mt-5" style={{ marginRight: "0" }}>
      <Col className="text-center">
        <Button variant="primary" href="http://thptnghen.edu.vn" size="lg">
          Mời bạn ghé thăm trang web của nhà trường
        </Button>
      </Col>
    </Row>
  );
};

export default About;
