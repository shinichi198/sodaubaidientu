import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtonsDashboard from "./ActionButtonsDashboard";

const SingleDashboard = ({
  lop: {
    _id,
    user,
    tietCT,
    tiet,
    subject,
    _class,
    cahoc,
    ngay,
    tenbai,
    nhanxet,
    xeploai,
    thu,
  },
  check,
}) => {
  const thungays = (id) => {
    switch (id) {
      case "1":
        return "Thứ 2";
      case "2":
        return "Thứ 3";
      case "3":
        return "Thứ 4";
      case "4":
        return "Thứ 5";
      case "5":
        return "Thứ 6";
      case "6":
        return "Thứ 7";
      case "0":
        return "Chủ nhật";
      default:
    }
  };
  const tenca = (id) => {
    switch (id) {
      case 0:
        return "Ca sáng";
      case 1:
        return "Ca chiều";
      default:
    }
  };
  const tentiet = (id) => {
    switch (id) {
      case 1:
        return "Tiết 1";
      case 2:
        return "Tiết 2";
      case 3:
        return "Tiết 3";
      case 4:
        return "Tiết 4";
      case 5:
        return "Tiết 5";
      default:
    }
  };
  return (
    <Card className="shadow my-4" border={check ? "danger" : "success"}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">
                &nbsp;
                {thungays(thu)}&nbsp; Ngày:&nbsp;
                {new Date(ngay).toLocaleDateString()}
              </p>
            </Col>
            <Col className="text-right">
              {!check && <ActionButtonsDashboard _id={_id} />}
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>
          <Badge variant={check ? "danger" : "success"}>{tenca(cahoc)}</Badge>
          &nbsp;
          <Badge variant={check ? "danger" : "success"}>{tentiet(tiet)}</Badge>
          &nbsp; Lớp:&nbsp;
          {_class && (
            <Badge variant={check ? "danger" : "success"}>{_class.name}</Badge>
          )}
          &nbsp; Môn:&nbsp;
          {subject && (
            <Badge variant={check ? "danger" : "success"}>{subject.name}</Badge>
          )}
          &nbsp; Tiết CT:&nbsp;
          <Badge variant={check ? "danger" : "success"}>{tietCT}</Badge>
        </Card.Text>
        <Card.Text>
          Tên bài:&nbsp;
          <Badge variant={check ? "danger" : "success"}>{tenbai}</Badge>&nbsp;
        </Card.Text>
        <Card.Text>
          Nhận xét:&nbsp;
          <Badge variant={check ? "danger" : "success"}>{nhanxet}</Badge>
          &nbsp;Xếp loại:&nbsp;
          <Badge variant={check ? "danger" : "success"}>{xeploai}</Badge>&nbsp;
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleDashboard;
