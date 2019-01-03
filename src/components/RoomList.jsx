import React, { Component } from "react";

class RoomList extends Component {
  render() {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
    return (
      <React.Fragment>
        <h3>RoomList</h3>

        <ul>
          {orderedRooms.map(room => {
            const active = this.props.roomId === room.id ? "active" : "";
            return (
              <li key={room.id} className={active}>
                <a
                  href="https:www.google.com"
                  onClick={() => this.props.subscribeToRoom(room.id)}
                >
                  #{room.name}
                </a>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default RoomList;
