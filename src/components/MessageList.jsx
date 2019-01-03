import React, { Component } from "react";
import Message from "./Message";

class MessageList extends Component {
  state = {};
  render() {
    if (!this.props.roomId) {
      return (
        <React.Fragment>
          <div className="jumbotron text-center">
            <h1 className="display-3">Hola!</h1>
            <p className="lead">Welcome to React-Chat!</p>

            <p>Click on any room and enjoy chatting.</p>
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="#" role="button">
                &larr; Join a room!
              </a>
            </p>
          </div>
        </React.Fragment>
      );
    }
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
