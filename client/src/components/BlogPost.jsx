import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";


const BlogPost = ({_id, title, summary, cover, createdAt, author }) => {
  const { darkMode } = useContext(UserContext);

  return (
    <div
      className={`${
        darkMode ? "md:bg-card" : "md:bg-light-mode"
      } flex flex-col p-2 mt-5 rounded-md gap-3 md:flex-row md:gap-5 w-full animate-slideUp`}
    >
      <div className="flex-[1]">
        <Link to={`/post/${_id}`}>
          <img
            src={cover}
            // src="/"
            alt="Blog iamge"
            className={`w-full h-56 object-cover text-white flex items-center justify-center`}
          />
        </Link>
      </div>
      <div className="flex-[2] flex flex-col justify-start gap-5 px-3 md:py-3 md:px-0 relative group">
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
        <Link to={`/post/${_id}`} className="hidden cursor-pointer md:group-hover:flex bg-accent absolute p-2  bottom-0 right-0 m-3 animate-bounce text-white rounded-lg">Read More</Link>
      </div>
    </div>
  );
};

export default BlogPost;
