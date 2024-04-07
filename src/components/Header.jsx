import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [picture, setPicture] = useState(
    "https://occ-0-3752-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
  );
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  }

  useEffect(() => {
    if (user.photoURL) {
      setPicture(user.photoURL);
    }
  }, [user]);

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

      <div>
        <img
          src={picture}
          alt=""
          style={{ width: "60px", borderRadius: "50%" }}
        />
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Header;
