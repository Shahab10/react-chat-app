import React, { Component } from "react";
import Message from "./Message";

class MessageList extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h3>MessageList</h3>
        {this.props.messages.map((message, index) => {
          return (
            <Message
              key={index}
              username={message.senderId}
              text={message.text}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default MessageList;
