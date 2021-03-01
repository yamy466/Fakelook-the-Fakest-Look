import React from "react";
import { Link } from "react-router-dom";
import PostsService from "../../services/postsService";

function Home() {
  const printPosts = () => {
    const data = PostsService.getAllPosts();
    console.log(data);
  };

  return (
    <div>
      <Link className="ui primary button" to="/map">
        Move to Map
      </Link>
      <button className="ui primary button" onClick={printPosts()}>
        Show posts!
      </button>
    </div>
  );
}
export default Home;
