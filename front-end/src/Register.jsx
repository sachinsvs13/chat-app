import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

export default function Register() {
  const [message, setMessage] = useState("");
  const [createTodo, setCreateTodo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const nav = useNavigate();

  const use = () => {
    setTimeout(() => {
      nav("/");
    }, 3000);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          name: createTodo.name,
          email: createTodo.email,
          password: createTodo.password,
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
          <h1>Please Register</h1>
          <form onSubmit={handleCreateUser}>
            <div className="form-container">
              <label className="form-lb" htmlFor="username">
                User Name
              </label>
              <input
                type="text"
                name="username"
                placeholder="Please enter your user name"
                className="form-input"
                onChange={(e) =>
                  setCreateTodo({ ...createTodo, name: e.target.value })
                }
              />
            </div>
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
                  setCreateTodo({ ...createTodo, email: e.target.value })
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
                  setCreateTodo({ ...createTodo, password: e.target.value })
                }
              />
            </div>
            {message && (
              <p className="message">Please enter valid email and password</p>
            )}
            <div>
              <button className="login-btn" onClick={() => use()}>Register</button>
            </div>
          </form>
          <p className="register-tag">
            Haven't an account? Please{" "}
            <Link to="/login" className="login-link">
              Login
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
