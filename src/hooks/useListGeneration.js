import { useState, useEffect, useCallback } from 'react';
import {
  checkAndProcessAutoUpdate,
  getUpdateStatus,
  getListStatistics,
  getAllPeriodsWithSummary
} from '../utils/listGenerator';
import { getMetadata, getCurrentPeriod } from '../utils/storage';

/**
 * Custom hook for 15-day automatic list generation
 */
export const useListGeneration = () => {
  const [updateStatus, setUpdateStatus] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateOccurred, setUpdateOccurred] = useState(false);

  // Check for update on component mount and periodically
  useEffect(() => {
    const checkForUpdates = () => {
      setLoading(true);
      const result = checkAndProcessAutoUpdate();
      
      if (result.needsUpdate) {
        setUpdateOccurred(true);
      }

      const status = getUpdateStatus();
      setUpdateStatus(status);

      const stats = getListStatistics();
      setStatistics(stats);

      setLoading(false);
    };

    // Initial check
    checkForUpdates();

    // Check every hour for updates
    const interval = setInterval(checkForUpdates, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Manually refresh update status
   */
  const refreshStatus = useCallback(() => {
    setLoading(true);
    const result = checkAndProcessAutoUpdate();
    
    if (result.needsUpdate) {
      setUpdateOccurred(true);
    }

    const status = getUpdateStatus();
    setUpdateStatus(status);

    const stats = getListStatistics();
    setStatistics(stats);

    setLoading(false);

    return result;
  }, []);

  /**
   * Get countdown text
   */
  const getCountdownText = useCallback(() => {
    if (!updateStatus) return '';
    
    const daysRemaining = updateStatus.daysRemaining;
    
    if (daysRemaining === 0) {
      return 'Update due today!';
    } else if (daysRemaining === 1) {
      return 'Update due tomorrow';
    } else if (updateStatus.isOverdue) {
      return 'Update overdue!';
    } else {
      return `${daysRemaining} days remaining`;
    }
  }, [updateStatus]);

  /**
   * Clear update occurred flag
   */
  const clearUpdateFlag = useCallback(() => {
    setUpdateOccurred(false);
  }, []);

  /**
   * Get all periods with summary
   */
  const getAllPeriods = useCallback(() => {
    return getAllPeriodsWithSummary();
  }, []);

  /**
   * Get current period info
   */
  const getCurrentPeriodInfo = useCallback(() => {
    return getCurrentPeriod();
  }, []);

  /**
   * Get metadata
   */
  const getMetadataInfo = useCallback(() => {
    return getMetadata();
  }, []);

  /**
   * Calculate update progress percentage
   */
  const getUpdateProgressPercentage = useCallback(() => {
    if (!updateStatus) return 0;
    const totalDays = 15;
    const daysElapsed = totalDays - updateStatus.daysRemaining;
    return Math.round((daysElapsed / totalDays) * 100);
  }, [updateStatus]);

  return {
    updateStatus,
    statistics,
    loading,
    updateOccurred,
    refreshStatus,
    getCountdownText,
    clearUpdateFlag,
    getAllPeriods,
    getCurrentPeriodInfo,
    getMetadataInfo,
    getUpdateProgressPercentage
  };
};
