import { useState } from "react";
import "./email.css";

function Email() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError("The email you entered is not valid.");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
      setEmail("");
    }
  };

  return (
    <div className={`email-container ${!isValid ? "invalid" : ""}`}>
      <p className="email-info">
        Be the first to know about news, events, and progress.
      </p>
      <div className="email-input-wrapper">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
        />
        <button type="button" onClick={handleSubmit} className="email-submit">
          <svg
            width="32"
            height="32"
            viewBox="0 0 31 30"
            fill="none"
            stroke="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Arrow Icon</title>
            <path
              d="M1 15H29M29 15L15 1M29 15L15 29"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            ></path>
          </svg>
        </button>
      </div>
      {error && <p className="email-error">{error}</p>}
    </div>
  );
}

export default Email;
