import React, { Component } from "react";

class NewRoomForm extends Component {
  constructor() {
    super();
    this.state = { roomName: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      roomName: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({ roomName: "" });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.roomName}
            type="text"
            placeholder="Create a new room"
            required
          />
          <button type="submit">+</button>
        </form>
      </React.Fragment>
    );
  }
}

export default NewRoomForm;
