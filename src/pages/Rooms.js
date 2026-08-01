import React, { useState, useMemo } from 'react';
import RoomTable from '../components/RoomTable';
import AddRoomModal from '../components/AddRoomModal';
import SearchBar from '../components/SearchBar';
import { useRooms } from '../hooks/useRooms';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../components/AuthContext';
import './Rooms.css';

const Rooms = () => {
  const { rooms, addRoom, updateRoom, deleteRoom, searchRooms } = useRooms();
  const { success, error } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const { currentUser } = useAuth();

  // Filter rooms based on search and user role
  const filteredRooms = useMemo(() => {
    let results = searchRooms(searchQuery);
    if (currentUser && currentUser.role === 'student' && currentUser.roomId) {
      results = results.filter(room => room.id === currentUser.roomId);
    }
    return results;
  }, [searchQuery, searchRooms, currentUser]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleOpenModal = (room = null) => {
    setEditingRoom(room || null);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
    setFormErrors({});
  };

  const handleSaveRoom = async (formData) => {
    let result;

    if (editingRoom) {
      result = await updateRoom(editingRoom.id, formData);
    } else {
      result = await addRoom(formData);
    }

    if (result.success) {
      success(editingRoom ? 'Room updated successfully!' : 'Room added successfully!');
      handleCloseModal();
    } else {
      setFormErrors(result.errors || {});
      error(editingRoom ? 'Failed to update room' : 'Failed to add room');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm('Are you sure you want to delete this room? All assigned people will remain in the list.')) {
      await deleteRoom(roomId);
      success('Room deleted successfully!');
      setSelectedRoomId(null);
    }
  };

  return (
    <div className="rooms-page">
      <div className="rooms-header">
        <div className="rooms-title-section">
          <h1>Rooms Management</h1>
          <p className="rooms-subtitle">Manage all rooms and their details</p>
        </div>

        {(!currentUser || currentUser.role === 'admin') && (
          <button
            className="btn btn-primary btn-lg"
            onClick={() => handleOpenModal()}
          >
            + Add New Room
          </button>
        )}
      </div>

      <div className="rooms-controls">
        <div className="search-container">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by room number or name..."
          />
        </div>
        <p className="results-count">
          Showing {filteredRooms.length} of {rooms.length} rooms
        </p>
      </div>

      <div className="rooms-content">
        <RoomTable
          rooms={filteredRooms}
          onEdit={handleOpenModal}
          onDelete={handleDeleteRoom}
          onSelect={setSelectedRoomId}
          selectedId={selectedRoomId}
          isAdmin={!currentUser || currentUser.role === 'admin'}
        />
      </div>

      <AddRoomModal
        isOpen={isModalOpen}
        room={editingRoom}
        onSave={handleSaveRoom}
        onClose={handleCloseModal}
        errors={formErrors}
      />
    </div>
  );
};

export default Rooms;
