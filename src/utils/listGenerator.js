/**
 * List Generator - Handles 15-day automatic update logic
 */

import {
  getTodayDate,
  isUpdateNeeded,
  addDays,
  getDaysDifference
} from './dateUtils';
import {
  generateUUID,
  getCurrentPeriod,
  saveCurrentPeriod,
  getListPeriods,
  saveListPeriods,
  getMetadata,
  saveMetadata,
  getPeople
} from './storage';

/**
 * Check if automatic update is needed and process if required
 * Returns { needsUpdate, message, newPeriod }
 */
export const checkAndProcessAutoUpdate = () => {
  const metadata = getMetadata();
  const currentPeriod = getCurrentPeriod();
  const today = getTodayDate();

  // Check if update is needed
  const needsUpdate = isUpdateNeeded(currentPeriod.nextUpdateDate);

  if (needsUpdate) {
    return generateNewListPeriod();
  }

  return {
    needsUpdate: false,
    message: 'No update needed',
    newPeriod: null
  };
};

/**
 * Generate new list period and archive current one
 */
export const generateNewListPeriod = () => {
  try {
    const currentPeriod = getCurrentPeriod();
    const listPeriods = getListPeriods();
    const metadata = getMetadata();
    const today = getTodayDate();

    // Archive current period to history
    const archivedPeriod = {
      ...currentPeriod,
      isActive: false,
      people: getPeople() // Store snapshot of current people
    };
    listPeriods.push(archivedPeriod);

    // Create new period
    const newStartDate = today;
    const newEndDate = addDays(today, 14);
    const newNextUpdateDate = addDays(newEndDate, 1);

    const newYear = newStartDate.split('-')[0];
    const newMonth = String(parseInt(newStartDate.split('-')[1])).padStart(2, '0');
    const newDay = String(parseInt(newStartDate.split('-')[2])).padStart(2, '0');

    const endYear = newEndDate.getFullYear();
    const endMonth = String(newEndDate.getMonth() + 1).padStart(2, '0');
    const endDay = String(newEndDate.getDate()).padStart(2, '0');

    const nextYear = newNextUpdateDate.getFullYear();
    const nextMonth = String(newNextUpdateDate.getMonth() + 1).padStart(2, '0');
    const nextDay = String(newNextUpdateDate.getDate()).padStart(2, '0');

    const newPeriod = {
      id: generateUUID(),
      startDate: `${newYear}-${newMonth}-${newDay}`,
      endDate: `${endYear}-${endMonth}-${endDay}`,
      isActive: true,
      generatedDate: `${newYear}-${newMonth}-${newDay}`,
      nextUpdateDate: `${nextYear}-${nextMonth}-${nextDay}`,
      lastUpdateDate: `${newYear}-${newMonth}-${newDay}`
    };

    // Update metadata
    metadata.lastUpdateDate = today;
    metadata.nextUpdateDate = `${nextYear}-${nextMonth}-${nextDay}`;
    metadata.lastCheckDate = today;

    // Save all changes
    saveListPeriods(listPeriods);
    saveCurrentPeriod(newPeriod);
    saveMetadata(metadata);

    return {
      needsUpdate: true,
      message: `List updated successfully! New period: ${newPeriod.startDate} to ${newPeriod.endDate}`,
      newPeriod,
      archivedPeriod
    };
  } catch (error) {
    console.error('Error generating new list period:', error);
    return {
      needsUpdate: false,
      message: 'Error processing update',
      error
    };
  }
};

/**
 * Get list period by ID
 */
export const getListPeriodById = (periodId) => {
  const listPeriods = getListPeriods();
  return listPeriods.find(period => period.id === periodId);
};

/**
 * Get people for specific period
 */
export const getPeopleForPeriod = (periodId) => {
  const period = getListPeriodById(periodId);
  return period ? period.people : [];
};

/**
 * Get list statistics for period
 */
export const getListStatistics = (periodId = null) => {
  let period;
  let people;

  if (periodId) {
    period = getListPeriodById(periodId);
    people = period ? period.people : [];
  } else {
    period = getCurrentPeriod();
    people = getPeople();
  }

  if (!period) {
    return null;
  }

  const rooms = {};
  people.forEach(person => {
    if (!rooms[person.roomId]) {
      rooms[person.roomId] = [];
    }
    rooms[person.roomId].push(person);
  });

  const stats = {
    periodId: period.id,
    startDate: period.startDate,
    endDate: period.endDate,
    generatedDate: period.generatedDate,
    totalPeople: people.length,
    totalRoomsWithPeople: Object.keys(rooms).length,
    roomStats: Object.entries(rooms).map(([roomId, roomPeople]) => ({
      roomId,
      count: roomPeople.length,
      people: roomPeople
    }))
  };

  return stats;
};

/**
 * Calculate days until next update
 */
export const getDaysUntilNextUpdate = () => {
  const metadata = getMetadata();
  const today = getTodayDate();
  return getDaysDifference(new Date(today), new Date(metadata.nextUpdateDate));
};

/**
 * Force manual update (for testing/admin)
 */
export const forceManualUpdate = () => {
  const metadata = getMetadata();
  // Set next update date to today to trigger immediate update
  metadata.nextUpdateDate = getTodayDate();
  saveMetadata(metadata);
  return generateNewListPeriod();
};

/**
 * Get update status information
 */
export const getUpdateStatus = () => {
  const currentPeriod = getCurrentPeriod();
  const metadata = getMetadata();
  const today = getTodayDate();
  const daysUntilUpdate = getDaysDifference(new Date(today), new Date(currentPeriod.nextUpdateDate));

  return {
    lastUpdateDate: metadata.lastUpdateDate,
    nextUpdateDate: currentPeriod.nextUpdateDate,
    daysUntilUpdate,
    daysRemaining: Math.max(0, daysUntilUpdate),
    isOverdue: daysUntilUpdate < 0,
    currentPeriodStart: currentPeriod.startDate,
    currentPeriodEnd: currentPeriod.endDate,
    updateNeeded: isUpdateNeeded(currentPeriod.nextUpdateDate)
  };
};

/**
 * Get all periods with summary
 */
export const getAllPeriodsWithSummary = () => {
  const listPeriods = getListPeriods();
  const currentPeriod = getCurrentPeriod();

  const allPeriods = [
    ...listPeriods.map(period => ({
      ...period,
      totalPeople: period.people ? period.people.length : 0,
      isActive: false
    })),
    {
      ...currentPeriod,
      totalPeople: getPeople().length,
      isActive: true
    }
  ];

  return allPeriods.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
};
