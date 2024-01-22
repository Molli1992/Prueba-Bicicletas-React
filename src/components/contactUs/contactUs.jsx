import React, { useState } from "react";
import styles from "./contactUs.module.css";
import Swal from "sweetalert2";

function Contacto() {
  const [state, setState] = useState({
    name: "",
    mail: "",
    message: "",
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (state.name === "" || state.mail === "" || state.message === "") {
      Swal.fire({
        title: "",
        text: "Complete all the fields to send the message!",
        icon: "",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: "Successce!",
        text: "Message sent successfully",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        setState({
          name: "",
          mail: "",
          message: "",
        });
      });
    }
  };

  return (
    <div>
      <div className={styles.bodyContact}>
        <section className={styles.contact}>
          <div className={styles.contactContent}>
            <h2>¡Contact us now!</h2>
            <p>Our team of experts is ready to help you.</p>
          </div>

          <div className={styles.contactContainer}>
            <div className={styles.contactInfo}>
              <div className={styles.contactBox}>
                <div className={styles.contactText}>
                  <h3>Address</h3>
                  <p>16192 Coastal Highway, Lewes, Delaware 19958</p>
                </div>
              </div>

              <div className={styles.contactBox}>
                <div className={styles.contactText}>
                  <h3>Phone</h3>
                  <p>1(305)331-1196</p>
                </div>
              </div>

              <div className={styles.contactBox}>
                <div className={styles.contactText}>
                  <h3>Mail</h3>
                  <p>contact@bikebazaar.com</p>
                </div>
              </div>
            </div>

            <div className={styles.contactForm}>
              <h2>Send Message</h2>

              <div>
                <div className={styles.contactInputBox}>
                  <input
                    type="text"
                    name="name"
                    required="required"
                    placeholder=" "
                    onChange={onChange}
                    value={state.name}
                  />
                  <span>Name</span>
                </div>

                <div className={styles.contactInputBox}>
                  <input
                    type="text"
                    name="mail"
                    required="required"
                    placeholder=" "
                    onChange={onChange}
                    value={state.mail}
                  />
                  <span>Mail</span>
                </div>

                <div className={styles.contactInputBox}>
                  <textarea
                    required="required"
                    name="message"
                    placeholder=" "
                    onChange={onChange}
                    value={state.message}
                  ></textarea>
                  <span>Write your message...</span>
                </div>

                <div className={styles.contactInputBox}>
                  <button
                    type="submit"
                    className={styles.buttonContact}
                    onClick={onSubmit}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contacto;
