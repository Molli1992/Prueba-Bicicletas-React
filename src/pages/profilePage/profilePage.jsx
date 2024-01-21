import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./profilePage.module.css";
import axios from "axios";

function ProfilePage() {
  const storageName= localStorage.getItem("name");
  const storageEmail = localStorage.getItem("email");
  const navigate = useNavigate();
  const [orders, setOrders] = useState(false);
  const [stateOrders, setStateOrders] = useState(false);
  const [valueButton, setValueButton] = useState("See orders");
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;

  useEffect(() => {
    if (!orders) {
      axios
        .get(axiosUrl + "/api/orders")
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  }, [axiosUrl, orders]);

  if (!storageName) {
    Swal.fire({
      title: "Error!",
      text: "You must first login",
      icon: "error",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/");
      window.scroll(0, 0);
    });
  }

  const onClickError = () => {
    Swal.fire({
      title: "Error!",
      text: "In repair",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  const onClickOrders = () => {
    if (!stateOrders) {
      setStateOrders(true);
      setValueButton("Close orders");
    } else {
      setStateOrders(false);
      setValueButton("See orders");
    }
  };

  const onClickUpdateOrder = (i) => {
    axios
      .put(`${axiosUrl}/api/orders/${i.orderId}`)
      .then((res) => {
        setOrders(res.data);
        Swal.fire({
          title: "Success!",
          text: "You have successfully removed the order from the table!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-4">
              <div class="card mb-4">
                <div class="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    class="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 class="my-3">{storageName}</h5>
                  <p class="text-muted mb-1">Full Stack Developer</p>
                  <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
                  <div class="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={onClickOrders}
                    >
                      {valueButton}
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary ms-1"
                      onClick={onClickError}
                    >
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card mb-4">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Full Name</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{storageName}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Email</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{storageEmail}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Phone</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">(097) 234-5678</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Country</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">Argentina</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Address</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {stateOrders ? (
        <div className={styles.containerCard}>
          {orders &&
            orders.map((i) => {
              if (i.status === 0) {
                return null;
              } else {
                return (
                  <div
                    class="card"
                    style={{
                      width: "95%",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      class="card-header"
                      style={{
                        fontWeight: "bold",
                        fontSize: "30px",
                        display: "flex",
                      }}
                    >
                      <button
                        class="btn btn-primary"
                        onClick={() => onClickUpdateOrder(i)}
                      >
                        Delivered
                      </button>
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.cardBodyContainer}>
                        <h5 class="card-title">User:</h5>
                        <p class="card-text">
                          Name: <span style={{ color: "gray" }}>{i.name}</span>
                        </p>
                        <p class="card-text">
                          Email:{" "}
                          <span style={{ color: "gray" }}>{i.email}</span>
                        </p>
                      </div>

                      <div className={styles.cardBodyContainer}>
                        <h5 class="card-title">Product:</h5>
                        <p class="card-text">
                          Product:{" "}
                          <span style={{ color: "gray" }}>
                            {" "}
                            {i.description}
                          </span>
                        </p>
                        <p class="card-text">
                          Price:{" "}
                          <span style={{ color: "gray" }}>{i.price}</span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      ) : null}
    </div>
  );
}

export default ProfilePage;
