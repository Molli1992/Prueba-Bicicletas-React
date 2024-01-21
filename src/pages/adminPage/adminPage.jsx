import React, { useState, useEffect } from "react";
import styles from "./admingPage.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "../../components/button/button.jsx";

function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [stateOrder, setStateOrders] = useState(true);
  const axiosUrl = process.env.REACT_APP_AXIOS_URL;
  const userEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (!orders.length) {
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

  if (!userEmail) {
    Swal.fire({
      title: "Error!",
      text: "Blocked section",
      icon: "error",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/");
    });
  } else if (userEmail && userEmail !== "administrator@gmail.com") {
    Swal.fire({
      title: "Error!",
      text: "Blocked section",
      icon: "error",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/");
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

  const onClickStateOrders = () => {
    setStateOrders(!stateOrder);
    setCurrentPage(1); // Resetear a la primera página al cambiar el estado
  };

  const filteredOrders = orders.filter((order) =>
    stateOrder ? order.status === 1 : order.status === 0
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredOrders.slice(firstItemIndex, lastItemIndex);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };
  if (orders.length) {
    console.log(orders);
    return (
      <div className={styles.bodyAdmin}>
        <div className={styles.containerButton}>
          <Button
            Value={!stateOrder ? "Go to Undelivered" : "Go to Delivered"}
            OnClick={onClickStateOrders}
            Width="200px"
          />
        </div>
        <h1>{!stateOrder ? "Orders delivered:" : "Undelivered orders:"}</h1>
        <div className={styles.containerCard}>
          {currentItems.map((i) => (
            <div
              className="card"
              style={{
                width: "95%",
                margin: "10px 0px",
              }}
            >
              <div
                className="card-header"
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  display: "flex",
                }}
              >
                {!stateOrder ? (
                  <div>
                    <h2>Delivered</h2>
                    <p
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      | Number of order: {i.orderId}
                    </p>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => onClickUpdateOrder(i)}
                    >
                      Deliver
                    </button>
                    <p
                      style={{
                        fontSize: "14px",
                        marginTop: "15px"
                      }}
                    >
                     | Number of order: {i.orderId}
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardBodyContainer}>
                  <h5 className="card-title">User:</h5>
                  <p className="card-text">
                    Name: <span style={{ color: "gray" }}>{i.userName}</span>
                  </p>
                  <p className="card-text">
                    Email: <span style={{ color: "gray" }}>{i.email}</span>
                  </p>
                </div>

                <div className={styles.cardBodyContainer}>
                  <h5 className="card-title">Product:</h5>
                  <p className="card-text">
                    Product:{" "}
                    <span style={{ color: "gray" }}>
                      {i.productDescription}
                    </span>
                  </p>
                  <p className="card-text">
                    Price: <span style={{ color: "gray" }}>{i.price}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.containerArrows}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#006ce4"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
            onClick={handlePrevClick}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>

          <p>{currentPage}</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#006ce4"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
            onClick={handleNextClick}
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.bodyLoader}>
        <div class="spinner-border text-primary" role="status"></div>
      </div>
    );
  }
}

export default AdminPage;
