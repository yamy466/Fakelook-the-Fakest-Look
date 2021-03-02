import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link className="ui primary button" to="/map">
        Move to Map
      </Link>
    </div>
  );
}
export default Home;
