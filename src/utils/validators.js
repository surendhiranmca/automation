/**
 * Validation utilities
 */

/**
 * Validate room data
 */
export const validateRoom = (room) => {
  const errors = {};

  if (!room.roomNumber || room.roomNumber.trim() === '') {
    errors.roomNumber = 'Room number is required';
  }

  if (!room.roomName || room.roomName.trim() === '') {
    errors.roomName = 'Room name is required';
  }

  if (!room.capacity || room.capacity <= 0) {
    errors.capacity = 'Capacity must be greater than 0';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate person data
 */
export const validatePerson = (person) => {
  const errors = {};

  if (!person.name || person.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!person.roomId) {
    errors.roomId = 'Room selection is required';
  }

  if (!person.course || person.course.trim() === '') {
    errors.course = 'Course is required';
  }

  if (!person.dob || person.dob.trim() === '') {
    errors.dob = 'Date of Birth is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Check if room number already exists
 */
export const isRoomNumberUnique = (rooms, roomNumber, excludeId = null) => {
  return !rooms.some(room => 
    room.roomNumber === roomNumber && room.id !== excludeId
  );
};

/**
 * Check if registration number already exists
 */
export const isRegistrationNumberUnique = (people, regNumber, excludeId = null) => {
  return !people.some(person => 
    person.registrationNumber === regNumber && person.id !== excludeId
  );
};

/**
 * Validate search query
 */
export const validateSearchQuery = (query) => {
  return query && query.trim().length > 0;
};

/**
 * Validate filter options
 */
export const validateFilters = (filters) => {
  return filters && typeof filters === 'object';
};

/**
 * Sanitize string input
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  return input.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/**
 * Validate date format YYYY-MM-DD
 */
export const validateDateFormat = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Validate UUID format
 */
export const validateUUID = (uuid) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
};

/**
 * Validate capacity number
 */
export const validateCapacity = (capacity) => {
  const num = parseInt(capacity);
  return !isNaN(num) && num > 0 && num <= 1000;
};
