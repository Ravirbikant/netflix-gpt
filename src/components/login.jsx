import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateEmailPassword } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BG_IMG, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  function handleSignInClick() {
    let validateTest = validateEmailPassword(
      email.current.value,
      password.current.value
    );
    setErrorMessage(validateTest);
    if (validateTest) return;

    if (isSignUp) {
      if (name.current.value.length == 0) {
        setErrorMessage("Name cannot be empty");
        return;
      }
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((e) => {
              setErrorMessage(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " : " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " : " + errorMessage);
        });
    }
  }

  return (
    <div>
      <div className="login-background">
        <img src={BG_IMG} alt="" />
        <div className="overlay"></div>
      </div>
      <Header />

      <div className="login-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="d-flex flex-column gap-4">
            <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
            {isSignUp && <input ref={name} type="text" placeholder="Name" />}
            <input ref={email} type="text" placeholder="Email" />
            <input ref={password} type="password" placeholder="Password" />
            <p style={{ display: !errorMessage && "none" }}>{errorMessage}</p>
            <button onClick={handleSignInClick}>Sign In</button>
            <p
              onClick={() => {
                setIsSignUp(!isSignUp);
              }}
              style={{ cursor: "pointer" }}
            >
              {!isSignUp
                ? "New User? Click here to Sign in"
                : "Already a user click here."}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
