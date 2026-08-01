import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './FormModal.css';

const TransferPersonModal = ({ isOpen, person, rooms, currentRoom, onSave, onClose }) => {
  const [selectedRoomId, setSelectedRoomId] = useState('');

  useEffect(() => {
    if (person) {
      setSelectedRoomId('');
    }
  }, [person, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRoomId && selectedRoomId !== person.roomId) {
      onSave(selectedRoomId);
    }
  };

  const availableRooms = rooms.filter(room => room.id !== person?.roomId);

  return (
    <Modal isOpen={isOpen} title="Transfer Person" onClose={onClose} size="medium">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Person</label>
          <div className="info-box">
            <p className="info-text">{person?.name}</p>
            <p className="info-subtext">{person?.registrationNumber}</p>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Current Room</label>
          <div className="info-box">
            <p className="info-text">
              {currentRoom?.roomNumber} - {currentRoom?.roomName}
            </p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="newRoomId" className="form-label">
            Transfer to Room *
          </label>
          <select
            id="newRoomId"
            className="form-select"
            value={selectedRoomId}
            onChange={(e) => setSelectedRoomId(e.target.value)}
          >
            <option value="">Select a room</option>
            {availableRooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.roomNumber} - {room.roomName}
              </option>
            ))}
          </select>
          {availableRooms.length === 0 && (
            <span className="form-error">No other rooms available</span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!selectedRoomId || selectedRoomId === person?.roomId}
          >
            Transfer
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

const InfoBox = ({ label, value, subtext }) => (
  <div className="info-box">
    {label && <p className="info-label">{label}</p>}
    <p className="info-text">{value}</p>
    {subtext && <p className="info-subtext">{subtext}</p>}
  </div>
);

export default TransferPersonModal;
