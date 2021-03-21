import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import "./friends.css";
import ShowFriends from "./showFriends";
import ShowGroups from "./showGroups";

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = { showFriends: false };
  }

  friendsGroupsSwitch = () => this.setState({ showFriends: !this.state.showFriends });

  render() {
    return (
      <div>
        {(() => {
          switch (this.state.showFriends) {
            case true:
              return (
                <div>
                  <div className="padded">
                    <ShowFriends removeFriend={this.removeFriend} />
                  </div>
                  <div className="padded">
                    <Button primary onClick={this.friendsGroupsSwitch}>
                      Show your groups
                    </Button>
                  </div>
                </div>
              );
            default:
              return (
                <div>
                  <div>
                    <ShowGroups />
                  </div>
                  <div>
                    <Button primary onClick={this.friendsGroupsSwitch}>
                      Show your friends
                    </Button>
                  </div>
                </div>
              );
          }
        })()}
      </div>
    );
  }
}
export default Groups;
