import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import "../Styles/Login.css";
import axios from "axios";

export default function Login() {
  const [message, setMessage] = useState("");
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate();

  const use = () => {
    setTimeout(() => {
      nav("/");
    }, 3000);
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email: userLogin.email,
          password: userLogin.password,
        },
      );
      localStorage.setItem("token", data.token);
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div className="login-flex">
      <div className="login-container">
        <div className="login">
          <h1>Please Login</h1>
          <form onSubmit={handleLoginUser}>
            <div className="form-container">
              <label className="form-lb" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="form-input"
                onChange={(e) =>
                  setUserLogin({ ...userLogin, email: e.target.value })
                }
              />
            </div>
            <div className="form-container">
              <label className="form-lb" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                onChange={(e) =>
                  setUserLogin({ ...userLogin, password: e.target.value })
                }
              />
            </div>
            {message && (
              <p className="message">Please enter valid email and password</p>
            )}
            <div>
              <button className="login-btn" onClick={() => use()}>
                Login
              </button>
            </div>
          </form>
          <p className="register-tag">
            Haven't an account? Please{" "}
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
          <div className="google-container">
            <button className="google-btn">
              <FaGoogle className="google-icon" />
              Sign in with Google
            </button>
          </div>
          <p className="rights">© 2025, Todo App. All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
