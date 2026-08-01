/**
 * Sample Data for Room Name List Automation System
 * This file contains demo data for testing and demonstration
 */

import { generateUUID } from './storage';
import { getTodayDate } from './dateUtils';

const today = new Date();
const todayStr = today.toISOString().split('T')[0];

// Sample Rooms
export const sampleRooms = [
  {
    id: generateUUID(),
    roomNumber: '101',
    roomName: 'Building A - Floor 1',
    capacity: 25,
    createdDate: todayStr,
    isActive: true
  },
  {
    id: generateUUID(),
    roomNumber: '102',
    roomName: 'Building A - Floor 2',
    capacity: 30,
    createdDate: todayStr,
    isActive: true
  },
  {
    id: generateUUID(),
    roomNumber: '201',
    roomName: 'Building B - Floor 1',
    capacity: 20,
    createdDate: todayStr,
    isActive: true
  },
  {
    id: generateUUID(),
    roomNumber: '202',
    roomName: 'Building B - Floor 2',
    capacity: 28,
    createdDate: todayStr,
    isActive: true
  }
];

// Sample People (will be assigned to rooms)
export const samplePeople = [
  {
    id: generateUUID(),
    name: 'John Doe',
    registrationNumber: 'REG001',
    roomId: sampleRooms[0].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Jane Smith',
    registrationNumber: 'REG002',
    roomId: sampleRooms[0].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Michael Johnson',
    registrationNumber: 'REG003',
    roomId: sampleRooms[0].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Emily Brown',
    registrationNumber: 'REG004',
    roomId: sampleRooms[1].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'David Wilson',
    registrationNumber: 'REG005',
    roomId: sampleRooms[1].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Sarah Davis',
    registrationNumber: 'REG006',
    roomId: sampleRooms[1].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Robert Miller',
    registrationNumber: 'REG007',
    roomId: sampleRooms[1].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Lisa Anderson',
    registrationNumber: 'REG008',
    roomId: sampleRooms[2].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'James Taylor',
    registrationNumber: 'REG009',
    roomId: sampleRooms[2].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Jennifer Martinez',
    registrationNumber: 'REG010',
    roomId: sampleRooms[2].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Christopher Garcia',
    registrationNumber: 'REG011',
    roomId: sampleRooms[3].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Amanda Rodriguez',
    registrationNumber: 'REG012',
    roomId: sampleRooms[3].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Daniel Lee',
    registrationNumber: 'REG013',
    roomId: sampleRooms[3].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Jessica White',
    registrationNumber: 'REG014',
    roomId: sampleRooms[3].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Matthew Harris',
    registrationNumber: 'REG015',
    roomId: sampleRooms[0].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Ashley Clark',
    registrationNumber: 'REG016',
    roomId: sampleRooms[1].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'transferred'
  },
  {
    id: generateUUID(),
    name: 'Ryan Thomas',
    registrationNumber: 'REG017',
    roomId: sampleRooms[2].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  },
  {
    id: generateUUID(),
    name: 'Nicole Jackson',
    registrationNumber: 'REG018',
    roomId: sampleRooms[0].id,
    assignedDate: todayStr,
    listPeriod: todayStr,
    status: 'active'
  }
];

/**
 * Initialize sample data into storage
 */
export const initializeSampleData = () => {
  // Check if data already exists
  const existingRooms = localStorage.getItem('rnl_rooms');
  const existingPeople = localStorage.getItem('rnl_people');

  if (existingRooms && JSON.parse(existingRooms).length > 0) {
    console.log('Sample data already exists, skipping initialization');
    return false;
  }

  try {
    localStorage.setItem('rnl_rooms', JSON.stringify(sampleRooms));
    localStorage.setItem('rnl_people', JSON.stringify(samplePeople));
    
    // Update metadata
    const metadata = {
      lastUpdateDate: todayStr,
      nextUpdateDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalRooms: sampleRooms.length,
      totalPeople: samplePeople.length,
      updateIntervalDays: 15,
      lastCheckDate: todayStr,
      appCreatedDate: todayStr
    };
    
    localStorage.setItem('rnl_metadata', JSON.stringify(metadata));
    
    console.log('Sample data initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing sample data:', error);
    return false;
  }
};

/**
 * Get summary of sample data
 */
export const getSampleDataSummary = () => {
  return {
    totalRooms: sampleRooms.length,
    totalPeople: samplePeople.length,
    roomDetails: sampleRooms.map(room => ({
      roomNumber: room.roomNumber,
      roomName: room.roomName,
      capacity: room.capacity,
      assignedPeople: samplePeople.filter(p => p.roomId === room.id).length
    }))
  };
};
