import React, { useEffect, useState } from "react";
import "./style.css"; // Make sure to create and import your CSS file
import {
  isEmail,
  notEmptyString,
  isPasswordCorrect,
} from "../logic/checkform";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [isShow, setIsShow] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  // Handle showing the form
  const handleSetIsShow = () => {
    setIsShow(true);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const handleShowRegister = () => {
    setRegister(true);
  };
  const hanldeShowLogin = () => {
    setRegister(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
      if (isRegister) {
      const emailCheck = isEmail(formData.email);
      const usernameCheck = notEmptyString(formData.username);
      const passwordCheck = isPasswordCorrect(
        formData.password,
        formData.re_password
      );

      if (emailCheck !== true) {
        return toast.warn(emailCheck.errorMessage, { title: emailCheck.title });
      }
      if (usernameCheck !== true) {
        return toast.warn(usernameCheck.errorMessage, {
          title: usernameCheck.title,
        });
      }
      if (passwordCheck !== true) {
        return toast.warn(passwordCheck.errorMessage, {
          title: passwordCheck.title,
        });
      }
      // Proceed if all checks pass
      const res = await fetch(import.meta.env.VITE_CREATE_USER_URL, {
        method: "POST", // Assuming you are sending a POST request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      let data = await res.json()
      if (!data.EC) {
        toast.success("Register succesful !");
        // change to login form if register success
        setRegister(false);
      } else {
        toast.error(data.EM);
      }
    }
    else { 
      const res = await fetch(import.meta.env.VITE_USER_LOGIN_URL, {
        method: "POST", // Assuming you are sending a POST request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          // email: formData.email,
          password: formData.password,
        }),
      });
      let data = await res.json()
      if (!data.EC) {
        toast.success("Login succesful !");
        // change to login form if register success
        setRegister(false);
        setIsShow(false)
      } else {
        toast.error(data.EM);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <p>You can store your favourite location when </p>
        <button onClick={handleSetIsShow} style={{ marginLeft: "14px" }}>
          Login
        </button>
      </div>

      {isShow && (
        <div className="bg_login_form">
          <div className="login_container">
            <button
              onClick={handleClose}
              style={{ color: "red" }}
              className="close_button"
            >
              x
            </button>
            <h2>{isRegister ? "Register" : "Login"}</h2>
            <form
              onSubmit={handleSubmit}
              className={`login_form flex flex-col`}
            >
              <div className="flex gap-2 w-full">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username || ""}
                  onChange={handleInputChange}
                  required
                  className="login_input"
                />
              </div>
              {!isRegister && (
                <div className="flex gap-2 w-full">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleInputChange}
                    required
                    className="login_input"
                  />
                </div>
              )}
              {isRegister && (
                <>
                  <div className="flex gap-2 w-full">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      required
                      className="login_input"
                    />
                  </div>
                  <div className="flex gap-2 w-full">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password || ""}
                      onChange={handleInputChange}
                      required
                      className="login_input"
                    />
                  </div>
                  <div className="flex gap-2 w-full">
                    <label> Re Password:</label>
                    <input
                      type="password"
                      name="re_password"
                      value={formData.re_password || ""}
                      onChange={handleInputChange}
                      required
                      className="login_input"
                    />
                  </div>
                </>
              )}
              <button type="submit">{isRegister ? "Register" : "Login"}</button>
              {isRegister ? (
                <p>
                  You already have an account? Log in in{" "}
                  <a onClick={hanldeShowLogin} className="pointer">
                    here
                  </a>
                </p>
              ) : (
                <p>
                  You don't have an account? Create a new one{" "}
                  <a onClick={handleShowRegister} className="pointer">
                    here
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
