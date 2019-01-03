import React, { Component } from "react";

class RoomList extends Component {
  render() {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
    return (
      <React.Fragment>
        <div className="card">
          <h3 className="card-header">Chatrooms</h3>

          <ul className="list-group list-group-flush">
            {orderedRooms.map(room => {
              const active = this.props.roomId === room.id ? "active" : "";
              return (
                <li key={room.id} className={"list-group-item "}>
                  <a
                    href="#"
                    onClick={() => this.props.subscribeToRoom(room.id)}
                  >
                    #{room.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default RoomList;
