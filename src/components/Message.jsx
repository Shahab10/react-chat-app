import React from "react";

function Message(props) {
  return (
    <React.Fragment>
      <div>{props.username}</div>
      <div>{props.text}</div>
      <br />
    </React.Fragment>
  );
}

export default Message;
