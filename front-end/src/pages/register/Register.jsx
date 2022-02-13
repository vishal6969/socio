import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();

  const clickHandler = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Password do not match");
    } else {
      const user = {
        email: email.current.value,
        password: password.current.value,
        username: username.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
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
          <form className="loginBox" onSubmit={clickHandler}>
            <input
              placeholder="Username"
              required
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="Email"
              required
              className="loginInput"
              type="email"
              ref={email}
            />
            <input
              placeholder="Password"
              required
              className="loginInput"
              type="password"
              minLength="6"
              ref={password}
            />
            <input
              placeholder="Password Again"
              required
              className="loginInput"
              type="password"
              ref={passwordAgain}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Log into Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
