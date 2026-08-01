import React, { useState, useEffect } from 'react';
import { getUsers, saveUsers, generateUUID, getRooms } from '../utils/storage';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roomId, setRoomId] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setUsers(getUsers());
    setAvailableRooms(getRooms());
  }, []);

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(u => u.id !== id);
      setUsers(updatedUsers);
      saveUsers(updatedUsers);
    }
  };

  return (
    <div className="users-container">
      <div className="users-list-card">
        <h3>Existing Users</h3>
        <div className="users-list">
          {users.map(user => (
            <div key={user.id} className="user-item">
              <div className="user-info" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="user-username">{user.username}</span>
                  <span className={`user-role role-${user.role}`}>{user.role}</span>
                </div>
                {user.role === 'student' && user.roomId && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    Room: {availableRooms.find(r => r.id === user.roomId)?.roomName || 'Unknown'}
                  </span>
                )}
              </div>
              {user.role !== 'admin' && (
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
