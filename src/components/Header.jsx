import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removerUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  function handleSignOut() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removerUser());
        navigate("/");
      }
    });

    // Unsubscribe to onAuthStateChanged when Header component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div
      className="d-flex justify-content-between py-2 px-4 align-items-center"
      style={{ background: "black" }}
    >
      <img
        className="logo-image"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix header logo"
      />

      {user && (
        <div>
          <img
            src={user.photoURL}
            alt=""
            style={{ width: "60px", borderRadius: "50%" }}
          />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default Header;
