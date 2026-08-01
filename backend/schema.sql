CREATE DATABASE IF NOT EXISTS hostel_automation;
USE hostel_automation;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
  id VARCHAR(255) PRIMARY KEY,
  roomNumber VARCHAR(50) NOT NULL,
  roomName VARCHAR(255) NOT NULL,
  capacity INT NOT NULL,
  createdDate VARCHAR(50) NOT NULL,
  isActive BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS people (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  registrationNumber VARCHAR(100) NOT NULL,
  roomId VARCHAR(255) NOT NULL,
  dob VARCHAR(50),
  course VARCHAR(100) NOT NULL,
  assignedDate VARCHAR(50) NOT NULL,
  listPeriod VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Insert default admin user
INSERT IGNORE INTO users (id, username, password, role) VALUES ('admin-001', 'admin', 'admin', 'admin');
