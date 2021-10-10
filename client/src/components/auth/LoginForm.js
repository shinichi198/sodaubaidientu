import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
const LoginForm = () => {
  //Context
  const { loginUser } = useContext(AuthContext);

  //Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);
  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form className="my-4" onSubmit={login}>
      <AlertMessage info={alert} />
      <Form.Group className="my-4">
        <Form.Control
          type="text"
          placeholder="Tên đăng nhập"
          name="username"
          required
          value={username}
          onChange={onChangeLoginForm}
        />
      </Form.Group>
      <Form.Group className="my-4">
        <Form.Control
          type="password"
          placeholder="Mật khẩu"
          name="password"
          required
          value={password}
          onChange={onChangeLoginForm}
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Đăng nhập
      </Button>
    </Form>
  );
};

export default LoginForm;
