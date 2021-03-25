import { useEffect, useState } from "react";
import { Card, Button, Header } from "semantic-ui-react";
import "./friends.css";
import { deleteFriend, getFriends } from "../../services/socialServices";

const ShowFriends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getFriends();
        setFriends(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const removeFriend = async name => {
    try {
      const res = await deleteFriend(name);
      setFriends(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header as="h2">Your friends:</Header>
      <Card.Group>
        {friends.map(f => {
          return (
            <div className="friendCard">
              <Card key={f} header={f}></Card>
              <Button onClick={() => removeFriend(f)} inverted color="red">
                Remove
              </Button>
            </div>
          );
        })}
      </Card.Group>
    </div>
  );
};

export default ShowFriends;
