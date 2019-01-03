import React, { Component } from "react";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";
import Chatkit from "@pusher/chatkit";
import { instanceLocator, testToken, username } from "./chat-config";
import "bootstrap/dist/css/bootstrap.css";
// import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: username,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.getRooms();
    });
  }

  subscribeToRoom(roomId) {
    this.setState({
      messages: []
    });
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({ roomId: room.id });
        this.getRooms();
      })
      .catch(err => console.log("error on subscribing to room: ", err));
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("error on joinableRooms: ", err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  createRoom(roomName) {
    this.currentUser
      .createRoom({
        name: roomName
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log("Error creating new room" + err));
  }

  render() {
    console.log(this.state.messages);
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="#">
            React Application
          </a>
        </nav>

        <div className="row">
          <div className="col col-md-3">
            <NewRoomForm createRoom={this.createRoom} />
            <RoomList
              roomId={this.state.roomId}
              subscribeToRoom={this.subscribeToRoom}
              rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            />
          </div>
          <div className="col col-md-9">
            <MessageList
              messages={this.state.messages}
              roomId={this.state.roomId}
            />
            <SendMessageForm sendMessage={this.sendMessage} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
