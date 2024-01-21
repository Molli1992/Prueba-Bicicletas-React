import React, { useState } from "react";
import styles from "./singUp.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function SingUpPage() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");

  if (userName) {
    Swal.fire({
      title: "Error!",
      text: "You are already logged in",
      icon: "error",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/");
      window.scroll(0, 0);
    });
  }

  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const [repeatPassword, setReapeatPassword] = useState("");
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
  });

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeRepeatPassword = (e) => {
    setReapeatPassword(e.target.value);
  };

  const onSubmit = (e) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
      user.email
    );
    const capitalLetter = /[A-Z]/.test(user.password);
    const hasMinuscule = /[a-z]/.test(user.password);
    const hasNumber = /[0-9]/.test(user.password);
    const validLength = user.password.length >= 8;

    if (
      user.name.length === 0 ||
      user.email.length === 0 ||
      user.password.length === 0 ||
      repeatPassword.length === 0
    ) {
      Swal.fire({
        title: "Error!",
        text: "Complete all fields",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (!emailPattern) {
      Swal.fire({
        title: "Error!",
        text: "Invalid email",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (!capitalLetter || !hasMinuscule || !hasNumber || !validLength) {
      Swal.fire({
        title: "Error!",
        text: "The password must have at least one lowercase letter, one uppercase letter, one number and a minimum of 8 characters.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (user.password !== repeatPassword) {
      Swal.fire({
        title: "Error!",
        text: "Password and Repeat your password must be the same",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      axios
        .post(axiosUrl + "/api/user", user)
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "You have registered successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            navigate("/login");
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: "The email is already in use",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  };

  return (
    <section class="vh-100" className={styles.body}>
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style={{ borderRadius: "25px" }}>
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form class="mx-1 mx-md-4">
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            onChange={onChange}
                            name="name"
                            value={user.name}
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                          />
                          <label class="form-label" for="form3Example1c">
                            Your Name
                          </label>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            onChange={onChange}
                            name="email"
                            value={user.email}
                            type="email"
                            id="form3Example3c"
                            class="form-control"
                          />
                          <label class="form-label" for="form3Example3c">
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            onChange={onChange}
                            name="password"
                            value={user.password}
                            type="password"
                            id="form3Example4c"
                            class="form-control"
                          />
                          <label class="form-label" for="form3Example4c">
                            Password
                          </label>
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            onChange={onChangeRepeatPassword}
                            name="repeatPassword"
                            value={repeatPassword}
                            type="password"
                            id="form3Example4cd"
                            class="form-control"
                          />
                          <label class="form-label" for="form3Example4cd">
                            Repeat your password
                          </label>
                        </div>
                      </div>

                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "left",
                        }}
                      >
                        <button
                          style={{ marginLeft: "10px" }}
                          type="button"
                          class="btn btn-primary btn-lg"
                          onClick={onSubmit}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      class="img-fluid"
                      alt="Error"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingUpPage;
