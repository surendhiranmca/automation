import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './FormModal.css';

const AddRoomModal = ({ isOpen, room, onSave, onClose, errors: initialErrors }) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomName: '',
    capacity: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (room) {
      setFormData({
        roomNumber: room.roomNumber,
        roomName: room.roomName,
        capacity: room.capacity.toString()
      });
    } else {
      setFormData({
        roomNumber: '',
        roomName: '',
        capacity: ''
      });
    }
    setErrors(initialErrors || {});
  }, [room, initialErrors, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} title={room ? 'Edit Room' : 'Add New Room'} onClose={onClose} size="medium">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomNumber" className="form-label">
            Room Number *
          </label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            className={`form-input ${errors.roomNumber ? 'error' : ''}`}
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="e.g., 101"
          />
          {errors.roomNumber && (
            <span className="form-error">{errors.roomNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="roomName" className="form-label">
            Room Name *
          </label>
          <input
            type="text"
            id="roomName"
            name="roomName"
            className={`form-input ${errors.roomName ? 'error' : ''}`}
            value={formData.roomName}
            onChange={handleChange}
            placeholder="e.g., Room A"
          />
          {errors.roomName && (
            <span className="form-error">{errors.roomName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="capacity" className="form-label">
            Capacity *
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            className={`form-input ${errors.capacity ? 'error' : ''}`}
            value={formData.capacity}
            onChange={handleChange}
            placeholder="e.g., 20"
            min="1"
            max="1000"
          />
          {errors.capacity && (
            <span className="form-error">{errors.capacity}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {room ? 'Update Room' : 'Add Room'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRoomModal;
