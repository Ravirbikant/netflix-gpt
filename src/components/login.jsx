import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateEmailPassword } from "../utils/validate";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const email = useRef(null);
  const password = useRef(null);

  function handleSignInClick() {
    let validateTest = validateEmailPassword(
      email.current.value,
      password.current.value
    );
    setErrorMessage(validateTest);
  }

  return (
    <div>
      <Header />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="d-flex flex-column w-50 border m-auto my-2">
          <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
          {isSignUp && <input type="text" placeholder="Name" />}
          <input ref={email} type="text" placeholder="Email" />
          <input ref={password} type="password" placeholder="Password" />
          <p>{errorMessage}</p>
          <button onClick={handleSignInClick}>Sign In</button>
          <p
            onClick={() => {
              setIsSignUp(!isSignUp);
            }}
          >
            {!isSignUp
              ? "New User? Click here to Sign in"
              : "Already a user click here."}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
