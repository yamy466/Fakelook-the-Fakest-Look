import env from "../../enviroments/enviroment";
import { addLike } from "../../actions/postsActions";
import { connect } from "react-redux";

const Like = props => {
  const { userId, item, type } = props;
  const { likes } = item;
  const alreadyLiked = likes?.includes(userId);

  return (
    <>
      <i
        className={`${alreadyLiked ? "fas" : "far"} fa-thumbs-up`}
        onClick={() => (alreadyLiked ? null : props.addLike(item.id, type))}
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

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(mapStateToProps, { addLike })(Like);
