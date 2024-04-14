import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removerUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gptSearch.showGPTSearch);

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

    //   // Unsubscribe to onAuthStateChanged when Header component unmounts
    return () => unsubscribe();
  }, []);

  function handleGPTSearchClick() {
    dispatch(toggleGPTSearchView());
  }

  function handleLanguageChange(e) {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="d-flex justify-content-between align-items-center header position-absolute w-100 px-4 py-2">
      <img
        className="logo-image"
        src={LOGO}
        alt="Netflix header logo"
        style={{ width: "170px" }}
      />

      {user && (
        <div>
          {showGPTSearch && (
            <select onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          {/* <button onClick={handleGPTSearchClick}>
            {showGPTSearch ? "Home" : "GPT Search"}
          </button> */}
          <div>
            <img src={user.photoURL} alt="" />
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
