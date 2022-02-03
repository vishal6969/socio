import { useRef } from "react";
import "./login.css";

export default function Login() {

  const email = useRef();
  const password = useRef();
  const clickHandler = (e) => {
    e.preventDefault();
    console.log(email.current.value+" "+password.current.value);
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socio</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Socio.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              ref={password}
              className="loginInput"
            />
            <button className="loginButton" type="submit" onClick={clickHandler}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
