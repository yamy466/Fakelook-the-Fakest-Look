import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./request.css";
import {
  addNewFriend,
  declineFriendRequest,
  getFriendRequests,
} from "../../services/socialServices";
import FriendRequest from "./friendRequest";

const FriendRequests = props => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getFriendRequests();
        setRequests(res.data);
        props.requestsCountChange(requests.length);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const acceptRequest = async targetName => {
    const requests = await addNewFriend(props.username, targetName);
    setRequests(requests);
  };

  const declineRequest = async targetName => {
    const requests = await declineFriendRequest(props.username, targetName);
    setRequests(requests);
  };

  return requests?.map(username => (
    <FriendRequest
      key={username}
      username={username}
      acceptRequest={acceptRequest}
      declineRequest={declineRequest}
    />
  ));
};

const mapStateToProps = ({ login }) => {
  return { username: login.username };
};

export default connect(mapStateToProps)(FriendRequests);
