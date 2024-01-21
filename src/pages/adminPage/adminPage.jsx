import React, { useState, useEffect } from "react";
import styles from "./admingPage.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function AdminPage() {
  const [orders, setOrders] = useState(false);
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  if (!userEmail) {
    Swal.fire({
      title: "Error!",
      text: "Blocked section",
      icon: "error",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/");
      window.scroll(0, 0);
    });
  } else if (userEmail && userEmail !== "administrator@gmail.com") {
    Swal.fire({
      title: "Error!",
      text: "Blocked section",
      icon: "error",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/");
      window.scroll(0, 0);
    });
  }

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

  useEffect(() => {
    if (!orders) {
      axios
        .get(axiosUrl + "/api/orders")
        .then((res) => {
          setOrders(res.data);
        })
        .catch(() => {
          Swal.fire({
            title: "Error!",
            text: "Error loading orders",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  }, [axiosUrl, orders]);

  return (
    <div className={styles.bodyAdmin}>
      <h1>Undelivered orders:</h1>
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
                      Deliver
                    </button>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardBodyContainer}>
                      <h5 class="card-title">User:</h5>
                      <p class="card-text">
                        Name:{" "}
                        <span style={{ color: "gray" }}>{i.userName}</span>
                      </p>
                      <p class="card-text">
                        Email: <span style={{ color: "gray" }}>{i.email}</span>
                      </p>
                    </div>

                    <div className={styles.cardBodyContainer}>
                      <h5 class="card-title">Product:</h5>
                      <p class="card-text">
                        Product:{" "}
                        <span style={{ color: "gray" }}>
                          {i.productDescription}
                        </span>
                      </p>
                      <p class="card-text">
                        Price: <span style={{ color: "gray" }}>{i.price}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>

      <h1>Orders delivered:</h1>
      <div className={styles.containerCard}>
        {orders &&
          orders.map((i) => {
            if (i.status === 1) {
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
                    <h2>Delivered</h2>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardBodyContainer}>
                      <h5 class="card-title">User:</h5>
                      <p class="card-text">
                        Name:{" "}
                        <span style={{ color: "gray" }}>{i.userName}</span>
                      </p>
                      <p class="card-text">
                        Email: <span style={{ color: "gray" }}>{i.email}</span>
                      </p>
                    </div>

                    <div className={styles.cardBodyContainer}>
                      <h5 class="card-title">Product:</h5>
                      <p class="card-text">
                        Product:{" "}
                        <span style={{ color: "gray" }}>
                          {i.productDescription}
                        </span>
                      </p>
                      <p class="card-text">
                        Price: <span style={{ color: "gray" }}>{i.price}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default AdminPage;
