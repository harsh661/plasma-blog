import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";


const BlogPost = ({_id, title, summary, cover, createdAt, author }) => {
  const { darkMode } = useContext(UserContext);

  return (
    <div
      className={`${
        darkMode ? "bg-card" : "bg-light-mode"
      } flex flex-col p-2 mt-5 rounded-md gap-3 cursor-pointer md:flex-row md:gap-5 w-full`}
    >
      <div className="flex-[1]">
        <Link to={`/post/${_id}`}>
          <img
            src={import.meta.env.VITE_REACT_SERVER+'/'+cover}
            alt="Blog iamge"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="flex-[2] flex flex-col justify-start gap-5">
        <Link to={`/post/${_id}`}>
          <h1
            className={`${darkMode ? "text-white" : ""} text-2xl font-semibold`}
          >
            {title}
          </h1>
        </Link>
        <span className={`flex flex-wrap gap-2 items-center ${darkMode ? 'text-dark-text': 'text-black'}`}>
            <span>{`By ${author?.username}`}</span>
            <div className={`h-3/4 w-[2px] ${darkMode?'bg-dark-text':'bg-black'}`}></div>
            {dateFormat(createdAt, "mmmm dS, yyyy")}
        </span>
        <p
          className={`${darkMode ? "text-dark-text" : "text-light-mode-text"}`}
        >
          {summary}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
