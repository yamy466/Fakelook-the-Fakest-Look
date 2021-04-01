import env from "../../enviroments/enviroment";
import { addLike } from "../../actions/postsActions";
import { connect } from "react-redux";
import { addLike as like } from "../../services/postsService";
import { useState } from "react";

const Like = ({ userId, item, type, addLike }) => {
  const [likes, setLikes] = useState(item.likes);
  const { id } = item;
  const alreadyLiked = likes?.includes(userId);

  const onLikeClick = async () => {
    if (type === "post") addLike(id, type);
    else await like(id, type);

    setLikes(likes ? [...likes, userId] : [userId]);
  };

  return (
    <>
      <i
        className={`${alreadyLiked ? "fas" : "far"} fa-thumbs-up`}
        onClick={() => (alreadyLiked ? null : onLikeClick())}
        style={{
          cursor: `${alreadyLiked ? "" : "pointer"}`,
          color: env.mainColorDark,
          fontSize: 20,
        }}
      ></i>
      {likes ? likes.length : 0}
    </>
  );
};

const mapStateToProps = ({ login }) => ({ userId: login.userId });

export default connect(mapStateToProps, { addLike })(Like);
