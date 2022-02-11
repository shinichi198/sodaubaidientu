import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ClassContext } from "../contexts/ClassContext";
import { WeekContext } from "../contexts/WeekContext";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import Form from "react-bootstrap/Form";
import { DashboardContext } from "../contexts/DashboardContext";
const ViewRecoder = () => {
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
    dashboardState: { dashboards },
    getAllDashboards,
  } = useContext(DashboardContext);
  const [newGrade, setNewGrade] = useState({
    week: "",
    lophoc: "",
  });
  useEffect(() => {
    getAllDashboards(newGrade.week);
  }, []);

  const [newData, setNewData] = useState(null);
  useEffect(() => {
    if (dashboards) {
      const node = dashboards.filter((db) => {
        return db.week === newGrade.week && db.lophoc === newGrade.lophoc;
      });
      setNewData(node);
    }
  }, [dashboards, newGrade]);

  useEffect(() => {
    getWeeks();
    getClasss();
  }, []);

  const onChangeForm = (event) => {
    setNewGrade({ ...newGrade, [event.target.name]: event.target.value });
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
  let body = null;
  body = (
    <>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Thứ/Ngày</th>
            <th scope="col">Ca</th>
            <th scope="col">Tiết</th>
            <th scope="col">Môn học</th>
            <th scope="col">Tiết theo CT</th>
            <th scope="col">HS nghỉ tiết</th>
            <th scope="col">Tên bài, nội dung công việc</th>
            <th scope="col">Nhận xét của giáo viên</th>
            <th scope="col">Xếp loại tiết học</th>
            <th scope="col">Ký tên</th>
          </tr>
        </thead>
        <tbody>
          {newData &&
            newData.map((lop) => (
              <>
                <tr>
                  <th scope="row" key={lop.id}>
                    {lop.thu} <br /> {lop.ngay}
                  </th>
                  <td>{tenca(lop.cahoc)}</td>
                  <td>{lop.tiet}</td>
                  <td>{lop.subject.name}</td>
                  <td>{lop.tietCT}</td>
                  <td>{lop.hocsinh}</td>
                  <td>{lop.tenbai}</td>
                  <td>{lop.nhanxet}</td>
                  <td>{lop.xeploai}</td>
                  <td>{lop.user.name}</td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  );
  return (
    <div>
      <div>
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
                    {khoi.name} ({new Date(khoi.startDate).toLocaleDateString()}{" "}
                    - {new Date(khoi.endDate).toLocaleDateString()})
                  </option>
                ))}
              </Form.Control>

              <Form.Control as="select" name="lophoc" onChange={onChangeForm}>
                <option value="">Chọn lớp</option>
                {classs &&
                  classs.map((lop) => (
                    <option key={lop._id} value={lop._id}>
                      {lop.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Row>
      </div>
      <div className="mt-2 table-responsive">{body}</div>
    </div>
  );
};

export default ViewRecoder;
