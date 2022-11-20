import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../features/usersSlice";

function SignIn() {
  const [login1, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(login({ login: login1, password }));
  };

  return (
    <>
      <div className="App1">
        <div className="forma">
          <div className="inputs">
            <input type="text" onChange={handleLogin} />
            <input type="password" onChange={handlePassword} />
          </div>
          <Link to="/" onClick={handleSubmit}>
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignIn;
