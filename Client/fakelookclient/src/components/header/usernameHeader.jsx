import { Message } from "semantic-ui-react";
import env from "../../enviroments/enviroment";

const UsernameHeader = ({ username }) => {
  return (
    <Message positive={username} negative={!username}>
      <Message.Header>
        {" "}
        Hi {!username && "There"}
        <span style={{ color: env.mainColorDark }}>{username || ""}</span>!
      </Message.Header>
      {!username && (
        <>
          <Message.Content> please login or register </Message.Content>
          <Message.Content> for full access</Message.Content>
        </>
      )}
    </Message>
  );
};

export default UsernameHeader;
