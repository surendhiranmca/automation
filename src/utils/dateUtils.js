/**
 * Date Utilities for Room Name List Automation System
 * Handles all date calculations, formatting, and period management
 */

/**
 * Format date to DD/MM/YYYY format
 */
export const formatDate = (date) => {
  if (!date) return '';
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Get today's date as YYYY-MM-DD
 */
export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Convert DD/MM/YYYY to Date object
 */
export const parseDate = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
};

/**
 * Add days to a date
 */
export const addDays = (date, days) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Calculate difference between two dates in days
 */
export const getDaysDifference = (date1, date2) => {
  if (typeof date1 === 'string') {
    date1 = new Date(date1);
  }
  if (typeof date2 === 'string') {
    date2 = new Date(date2);
  }
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Check if a date is today or in the past
 */
export const isDateInPast = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date <= today;
};

/**
 * Check if a date is today
 */
export const isToday = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

/**
 * Get next update date (current date + 15 days)
 */
export const getNextUpdateDate = (fromDate = null) => {
  if (!fromDate) {
    fromDate = new Date();
  } else if (typeof fromDate === 'string') {
    fromDate = new Date(fromDate);
  }
  return addDays(fromDate, 15);
};

/**
 * Get formatted countdown string
 */
export const getCountdownText = (nextUpdateDate) => {
  const today = new Date();
  const next = typeof nextUpdateDate === 'string' 
    ? new Date(nextUpdateDate) 
    : nextUpdateDate;
  
  const daysRemaining = getDaysDifference(today, next);
  
  if (daysRemaining === 0) {
    return 'Update due today!';
  } else if (daysRemaining === 1) {
    return 'Update due tomorrow';
  } else if (daysRemaining < 0) {
    return 'Update overdue - processing...';
  } else {
    return `${daysRemaining} days remaining`;
  }
};

/**
 * Calculate list period start and end dates
 */
export const getPeriodDates = (startDate = null) => {
  if (!startDate) {
    startDate = new Date();
  } else if (typeof startDate === 'string') {
    startDate = new Date(startDate);
  }

  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const day = String(startDate.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  const endDate = addDays(startDate, 14);
  const endYear = endDate.getFullYear();
  const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
  const endDay = String(endDate.getDate()).padStart(2, '0');
  const endDateStr = `${endYear}-${endMonth}-${endDay}`;

  return {
    startDate: dateStr,
    endDate: endDateStr,
    nextUpdateDate: addDays(endDate, 1).toISOString().split('T')[0]
  };
};

/**
 * Check if update is needed (when nextUpdateDate <= today)
 */
export const isUpdateNeeded = (nextUpdateDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const next = typeof nextUpdateDate === 'string'
    ? new Date(nextUpdateDate)
    : nextUpdateDate;
  next.setHours(0, 0, 0, 0);
  
  return next <= today;
};

/**
 * Get readable period string
 */
export const getPeriodString = (startDate, endDate) => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

/**
 * Get human-readable relative time
 */
export const getRelativeTime = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const today = new Date();
  const diffDays = getDaysDifference(today, date);
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

/**
 * Get month and year string
 */
export const getMonthYearString = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};
