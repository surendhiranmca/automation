import React from 'react';
import './RoomTable.css';

const RoomTable = ({ rooms, onEdit, onDelete, onSelect, selectedId, isAdmin = true }) => {
  if (!rooms || rooms.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">🏠</p>
        <p className="empty-message">No rooms found</p>
        <p className="empty-subtext">Create a new room to get started</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="room-table">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Room Name</th>
            <th>Capacity</th>
            <th>Created Date</th>
            <th>Status</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr
              key={room.id}
              className={`table-row ${selectedId === room.id ? 'selected' : ''}`}
              onClick={() => onSelect && onSelect(room.id)}
            >
              <td className="cell-primary">{room.roomNumber}</td>
              <td>{room.roomName}</td>
              <td>{room.capacity}</td>
              <td className="cell-date">{room.createdDate}</td>
              <td>
                <span className={`status-badge status-${room.isActive ? 'active' : 'inactive'}`}>
                  {room.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              {isAdmin && (
                <td className="cell-actions">
                  <button
                    className="action-btn btn-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(room);
                    }}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="action-btn btn-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(room.id);
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
