import { useState, useCallback } from 'react';

/**
 * Custom hook for notification management
 */
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Add notification
   */
  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now();
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration
    };

    setNotifications(prev => [...prev, notification]);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  /**
   * Remove notification
   */
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  /**
   * Clear all notifications
   */
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Show success notification
   */
  const success = useCallback((message, duration) => {
    return addNotification(message, 'success', duration);
  }, [addNotification]);

  /**
   * Show error notification
   */
  const error = useCallback((message, duration) => {
    return addNotification(message, 'error', duration || 5000);
  }, [addNotification]);

  /**
   * Show warning notification
   */
  const warning = useCallback((message, duration) => {
    return addNotification(message, 'warning', duration);
  }, [addNotification]);

  /**
   * Show info notification
   */
  const info = useCallback((message, duration) => {
    return addNotification(message, 'info', duration);
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };
};
