import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import image from "./image.png";
import { FaStar } from "react-icons/fa";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "centre",
  },
};

const Contact = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    question: "",
  });

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const submitData = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, message, question } = userData;
    if (
      firstName &&
      lastName &&
      email &&
      message &&
      (Array.isArray(question)
        ? question.every((rating) => rating !== 0)
        : question !== 0)
    ) {
      const res = await fetch(
        "https://ntpcfirebase-default-rtdb.firebaseio.com/userDataRecords.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            message,
            question: {
              relevance: currentValues[0] + " Stars",
              coverage: currentValues[1] + " Stars",
              contentQuality: currentValues[2] + " Stars",
              duration: currentValues[3] + " Stars",
              delivery: currentValues[4] + " Stars",
              interactions: currentValues[5] + " Stars",
            },
          }),
        }
      );

      if (res.ok) {
        setUserData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
          question: "",
        });
        setCurrentValues(Array(numQuestions).fill(0));
        alert("Data Stored");
      } else {
        alert("Failed to store data");
      }
    } else {
      alert(
        "Please fill in all the required fields and provide ratings for all questions"
      );
    }
  };

  const numQuestions = 6;
  const [currentValues, setCurrentValues] = useState(
    Array(numQuestions).fill(0)
  );
  const [hoverValues, setHoverValues] = useState(
    Array(numQuestions).fill(undefined)
  );

  const handleClick = (questionIndex, value) => {
    const newValues = [...currentValues];
    newValues[questionIndex] = value;
    setCurrentValues(newValues);
  };

  const handleMouseOver = (questionIndex, newHoverValue) => {
    const newHoverValues = [...hoverValues];
    newHoverValues[questionIndex] = newHoverValue;
    setHoverValues(newHoverValues);
  };

  const handleMouseLeave = (questionIndex) => {
    const newHoverValues = [...hoverValues];
    newHoverValues[questionIndex] = undefined;
    setHoverValues(newHoverValues);
  };

  const makeStar = (questionIndex, starIndex) => {
    return (
      <FaStar
        key={starIndex}
        size={12}
        onClick={() => handleClick(questionIndex, starIndex + 1)}
        onMouseOver={() => handleMouseOver(questionIndex, starIndex + 1)}
        onMouseLeave={() => handleMouseLeave(questionIndex)}
        color={
          (hoverValues[questionIndex] || currentValues[questionIndex]) >
          starIndex
            ? "orange"
            : "grey"
        }
        style={{
          marginRight: 2,
          cursor: "pointer",
        }}
      />
    );
  };

  return (
    <>
      <section className="contactus-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="contact-leftside col-12 col-lg-5">
                  <h1 className="main-heading fw-bold">
                    NTPC Limited <br /> Vindhyachal
                  </h1>
                  <p className="main-hero-para">
                    Your opinion matters! Complete the survey below to let us
                    know how we're doing and how we can better serve you.
                  </p>
                  <figure>
                    <img src={image} alt="contatUsImg" className="img-fluid" />
                  </figure>
                </div>

                <div className="contact-rightside col-12 col-lg-7">
                  <form method="POST">
                    <div className="row">
                      <div className="col-12 col-lg-6 contact-input-feild">
                        <input
                          type="text"
                          name="firstName"
                          id=""
                          className="form-control"
                          placeholder="First Name"
                          value={userData.firstName}
                          onChange={postUserData}
                        />
                      </div>
                      <div className="col-12 col-lg-6 contact-input-feild">
                        <input
                          type="text"
                          name="lastName"
                          id=""
                          className="form-control"
                          placeholder="Last Name"
                          value={userData.lastName}
                          onChange={postUserData}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 contact-input-feild">
                        <input
                          type="text"
                          name="email"
                          id=""
                          className="form-control"
                          placeholder="Email ID"
                          value={userData.email}
                          onChange={postUserData}
                        />
                      </div>
                    </div>

                    <div className="box">
                      <div class="container text-center">
                        <div class="row">
                          <div class="col">
                            <h3>Survey Questions</h3>
                          </div>
                          <div class="col">
                            <h3>Rating</h3>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            Relevance to your present and future role
                          </div>
                          <div class="col">
                            <div>
                              {[...Array(1).keys()].map((questionIndex) => (
                                <div key={1} style={styles.container}>
                                  <div style={styles.stars}>
                                    {[...Array(5).keys()].map((starIndex) =>
                                      makeStar(1, starIndex)
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            Converage of learning objectives
                          </div>
                          <div class="col">
                            <div>
                              {[...Array(1).keys()].map((questionIndex) => (
                                <div key={1} style={styles.container}>
                                  <div style={styles.stars}>
                                    {[...Array(5).keys()].map((starIndex) =>
                                      makeStar(2, starIndex)
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">Content quality and relevance</div>
                          <div class="col">
                            <div>
                              {[...Array(1).keys()].map((questionIndex) => (
                                <div key={1} style={styles.container}>
                                  <div style={styles.stars}>
                                    {[...Array(5).keys()].map((starIndex) =>
                                      makeStar(3, starIndex)
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            Duration of program for the topic
                          </div>
                          <div class="col">
                            <div>
                              {[...Array(1).keys()].map((questionIndex) => (
                                <div key={1} style={styles.container}>
                                  <div style={styles.stars}>
                                    {[...Array(5).keys()].map((starIndex) =>
                                      makeStar(4, starIndex)
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">Dellivery by the factory</div>
                          <div class="col">
                            <div>
                              {[...Array(1).keys()].map((questionIndex) => (
                                <div key={1} style={styles.container}>
                                  <div style={styles.stars}>
                                    {[...Array(5).keys()].map((starIndex) =>
                                      makeStar(5, starIndex)
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">Interactions with participants</div>
                          <div class="col">
                            <div>
                              {[...Array(1).keys()].map((questionIndex) => (
                                <div key={1} style={styles.container}>
                                  <div style={styles.stars}>
                                    {[...Array(5).keys()].map((starIndex) =>
                                      makeStar(6, starIndex)
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 ">
                        <input
                          type="text"
                          name="message"
                          id=""
                          className="form-control"
                          placeholder="Enter Your Feedback"
                          value={userData.message}
                          onChange={postUserData}
                        />
                      </div>
                    </div>
                    <div class="form-check form-checkbox-style">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                      />
                      <label
                        class="form-check-label"
                        className="main-hero-para"
                      >
                        I acknowledge receipt of the privacy policy.
                      </label>
                    </div>
                    <button
                      type="button"
                      class="btn btn-primary btn-lg btn-block"
                      onClick={submitData}
                    >
                      <h3>Submit</h3>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;



