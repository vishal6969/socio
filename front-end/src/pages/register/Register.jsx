import "./register.css";


export default function Register() {

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
              placeholder="Username"
              required
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
