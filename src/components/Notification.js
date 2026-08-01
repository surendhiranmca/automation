import React from 'react';
import './Notification.css';

const Notification = ({ notifications, onClose }) => {
  if (!notifications || notifications.length === 0) {
    return null;
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '•';
    }
  };

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <span className="notification-icon">
            {getIcon(notification.type)}
          </span>
          <span className="notification-message">
            {notification.message}
          </span>
          <button
            className="notification-close"
            onClick={() => onClose(notification.id)}
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
