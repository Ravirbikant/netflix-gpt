import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div>
      <Header />
      <form>
        <div className="d-flex flex-column w-50 border m-auto my-2">
          <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
          {isSignUp && <input type="text" placeholder="Name" />}
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
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
