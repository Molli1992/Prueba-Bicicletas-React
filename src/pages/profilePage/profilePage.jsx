import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProfilePage() {
  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();

  if (!userEmail) {
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

  const onClickRouteAdmin = () => {
    navigate("/admin");
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
                  <h5 class="my-3">{userName}</h5>
                  <p class="text-muted mb-1">Full Stack Developer</p>
                  <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
                  <div class="d-flex justify-content-center mb-2">
                    {userEmail === "administrator@gmail.com" ? (
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={onClickRouteAdmin}
                      >
                        Admin
                      </button>
                    ) : null}
                    <button
                      type="button"
                      class="btn btn-outline-primary ms-1"
                      onClick={onClickError}
                    >
                      View purchases
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
                      <p class="text-muted mb-0">{userName}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Email</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{userEmail}</p>
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
    </div>
  );
}

export default ProfilePage;
