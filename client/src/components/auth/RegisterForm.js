import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
const RegisterForm = () => {
  //Context
  const { registerUser } = useContext(AuthContext);

  //Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [alert, setAlert] = useState(null);
  const { username, password, name } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  const register = async (event) => {
    event.preventDefault();
    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        setAlert({ type: "success", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      } else {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form className="my-4" onSubmit={register}>
      <AlertMessage info={alert} />
      <Form.Group className="my-4">
        <Form.Control
          type="text"
          placeholder="Họ và tên"
          name="name"
          required
          value={name}
          onChange={onChangeRegisterForm}
        />
      </Form.Group>
      <Form.Group className="my-4">
        <Form.Control
          type="text"
          placeholder="Tên đăng nhập"
          name="username"
          required
          value={username}
          onChange={onChangeRegisterForm}
        />
      </Form.Group>
      <Form.Group className="my-4">
        <Form.Control
          type="password"
          placeholder="Mật khẩu"
          name="password"
          required
          value={password}
          onChange={onChangeRegisterForm}
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Đăng ký
      </Button>
    </Form>
  );
};

export default RegisterForm;
