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
            photoURL:
              "https://lh3.googleusercontent.com/a/ACg8ocIm4ovfNYbhqMrwwFKuHzDPYmCCiChqF8M2Whje3YKz8e8KFWCC=s432-c-no",
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
      <Header />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="d-flex flex-column w-50 border m-auto my-2">
          <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
          {isSignUp && <input ref={name} type="text" placeholder="Name" />}
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
