import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { YearContext } from "../../contexts/YearContext";
import { WeekContext } from "../../contexts/WeekContext";

const AddWeekAuto = () => {
  const { setShowAddWeekModal, showAddWeekModal, addWeek, setShowToast } =
    useContext(WeekContext);
  const onSubmit = () => {};
  const closeDialog = () => {};
  return (
    <Modal show={showAddWeekModal}>
      <Modal.Header closeButton>
        <Modal.Title>Tạo tuần tự động</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control type="Number" name="sotuan" />
          </Form.Group>
          <Form.Group>
            <Form.Control type="date" name="startDate" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Cập nhật
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddWeekAuto;
