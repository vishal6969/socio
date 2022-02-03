import { useRef, useContext } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
 
export default function Login() {

  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const clickHandler = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
            <button
              className="loginButton"
              type="submit"
              onClick={clickHandler}
              disabled={isFetching}
            >
              {isFetching ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
              {isFetching ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "Create new Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
