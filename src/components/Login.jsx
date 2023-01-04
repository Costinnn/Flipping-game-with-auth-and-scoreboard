import "./LogSign.scss";

import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";

import { useState } from "react";

const Login = ({ setLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useAuthContext();
  const { login, isPending, error } = useLogin();

  const handleSubmit =  (e) => {
    e.preventDefault();
     login(email, password);

  };

  const handleClose = () => {
    setLoginForm(false);
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} className="form-box">
        <span onClick={handleClose}>X</span>
        <label className="email">
          <span>Email</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label className="password">
          <span>Password</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        {!isPending && <button className="btn">LOGIN</button>}
        {isPending && (
          <button className="btn" disabled>
            LOADING...
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
