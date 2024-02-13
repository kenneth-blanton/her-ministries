import React, { useState, useEffect, useRef } from "react";
import "../styles/contact.css";
import prayerBanner from "../images/prayerBanner.webp";
import { db } from "../db/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function Contact() {
  const [newsletterChecked, setNewsletterChecked] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const textareaRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    function autoResize() {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }

    const textarea = textareaRef.current;
    textarea.addEventListener("input", autoResize);
    autoResize();

    // Cleanup function
    return () => {
      textarea.removeEventListener("input", autoResize);
    };
  }, []);

  function prayerChecker() {
    const prayer = textareaRef.current.value;
    if (prayer.length < 1) {
      textareaRef.current.style.border = "2px solid red";
      return false;
    }
    textareaRef.current.style.border = "1px solid var(--primary)";
  }

  async function sendAnonymously(e) {
    e.preventDefault();
    const prayer = textareaRef.current.value;
    // console.log(prayerChecker()); // undefined
    // console.log(!prayerChecker()); // true

    if (prayerChecker() === false) {
      setMessage(
        <div className="error">
          Please provide a prayer request before sending.
        </div>
      );
      return;
    }

    await addDoc(collection(db, "mail"), {
      to: ["LadyDi@herministries.net"],
      message: {
        subject: "Anonymous Prayer Request",
        html: `This is the <code>HTML</code> section of the email body. ${prayer}`,
      },
    })
      .then(() => {
        setMessage(
          <div className="success">Prayer Request Sent Anonymously.</div>
        );
        setButtonDisabled(true);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        setMessage(
          <div className="error">
            Error Sending Prayer Request. Try Again Please.
          </div>
        );
      });
  }

  async function sendPrayerRequest(e) {
    e.preventDefault();
    const prayer = textareaRef.current.value;

    if (prayerChecker() === false) {
      setMessage(
        <div className="error">
          Please provide a prayer request before sending.
        </div>
      );
      return;
    }

    if (newsletterChecked === true && !firstName && !lastName && !email) {
      setMessage(
        <div className="error">
          Please provide your name and email before sending to be added to
          newsletter.
        </div>
      );
      return;
    }

    newsletterChecked
      ? await Promise.all([
          subscriber(),
          addDoc(collection(db, "mail"), {
            to: ["LadyDi@herministries.net"],
            message: {
              subject: "Prayer Request",
              html: `Prayer Request from ${firstName} ${lastName} at ${email}: ${prayer}`,
            },
          }),
        ])
          .then(() => {
            setMessage(
              <div className="success">
                Prayer Request Sent. Thank You For Subscribing.
              </div>
            );
            setButtonDisabled(true);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            setMessage(
              <div className="error">
                Error Sending Prayer Request. Try Again Please.
              </div>
            );
          })
      : await addDoc(collection(db, "mail"), {
          to: ["LadyDi@herministries.net"],
          message: {
            subject: "Prayer Request",
            html: `Prayer Request from ${firstName} ${lastName} at ${email}: ${prayer}`,
          },
        })
          .then(() => {
            setMessage(<div className="success">Prayer Request Sent.</div>);
            setButtonDisabled(true);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            setMessage(
              <div className="error">
                Error Sending Prayer Request. Try Again Please.
              </div>
            );
          });
  }

  async function subscriber() {
    const q = query(collection(db, "subscribers"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setMessage(
        <div className="error">
          You are already subscribed to the newsletter.
        </div>
      );
      return;
    } else {
      await addDoc(collection(db, "subscribers"), {
        firstName,
        lastName,
        email,
      }).catch((error) => {
        console.error("Error adding document: ", error);
        setMessage(
          <div className="error">
            Error Subscribing To Newsletter. You're already subscribed. Please
            try again.
          </div>
        );
      });
    }
  }

  return (
    <div className="contact-page">
      <h1>How Can We Pray For You?</h1>
      <form action="">
        <label htmlFor="username">
          Name
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width={15}
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
        </label>

        <div id="namesWrapper">
          <div className="names">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span>First Name</span>
          </div>

          <div className="names">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <span>Last Name</span>
          </div>
        </div>

        <label htmlFor="email">
          Email
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={15}
          >
            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
          </svg>{" "}
          {newsletterChecked ? <span className="danger">*</span> : null}
        </label>
        <input
          type="email"
          required={newsletterChecked}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="prayer">
          Prayer Request{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            width={15}
          >
            <path d="M163.9 136.9c-29.4-29.8-29.4-78.2 0-108s77-29.8 106.4 0l17.7 18 17.7-18c29.4-29.8 77-29.8 106.4 0s29.4 78.2 0 108L310.5 240.1c-6.2 6.3-14.3 9.4-22.5 9.4s-16.3-3.1-22.5-9.4L163.9 136.9zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z" />
          </svg>
          <span className="danger">*</span>
        </label>
        <textarea name="prayer" id="prayer" ref={textareaRef} required />

        {message}

        <div id="subscribe">
          <label htmlFor="newsletter">
            Subscribe to Newsletter
            <button
              onClick={(e) => {
                e.preventDefault();
                setNewsletterChecked(!newsletterChecked);
              }}
            >
              {newsletterChecked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={15}
                  height={15}
                  fill="#ebb061"
                >
                  <path
                    fill="var(--primary)"
                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                  />
                </svg>
              ) : null}
            </button>
          </label>
        </div>

        <div id="submitWrapper">
          {isButtonDisabled ? (
            <button onClick={() => setButtonDisabled(!isButtonDisabled)}>
              Send Another Prayer
            </button>
          ) : (
            <>
              <button onClick={sendAnonymously}>Send Anonymously</button>
              <button onClick={sendPrayerRequest}>Send Prayer Request</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
