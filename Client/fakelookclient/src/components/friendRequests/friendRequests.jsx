import { useEffect, useState } from "react";
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
    const res = await addNewFriend(targetName);
    setRequests(res.data);
  };

  const declineRequest = async targetName => {
    const requests = await declineFriendRequest(targetName);
    setRequests(requests);
  };
  return requests && requests.length > 0
    ? requests?.map(username => (
        <FriendRequest
          key={username}
          username={username}
          acceptRequest={acceptRequest}
          declineRequest={declineRequest}
        />
      ))
    : null;
};

export default FriendRequests;
