import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../features/usersSlice";

function SignUp() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(registerUser({ login, password }));
  };

  return (
    <>
      <div className="App1">
        <div className="forma">
          <div className="inputs">
            <input type="text" onChange={handleLogin} />
            <input type="password" onChange={handlePassword} />
          </div>
          <Link to="/signIn" onClick={handleSubmit}>
            Регистрация
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignUp;
