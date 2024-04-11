import React from "react";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div>
      <form className="w-50 m-auto my-4">
        <input type="text" placeholder={lang[langKey].gptSearchPlaceHolder} />
        <button>{lang[langKey].search}</button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
