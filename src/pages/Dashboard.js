import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import { useListGeneration } from '../hooks/useListGeneration';
import { useRooms } from '../hooks/useRooms';
import { usePeople } from '../hooks/usePeople';
import { useAuth } from '../components/AuthContext';
import { formatDate } from '../utils/dateUtils';
import './Dashboard.css';

const Dashboard = ({ updateStatus }) => {
  const { updateStatus: status, statistics, updateOccurred, getCountdownText, getUpdateProgressPercentage } = useListGeneration();
  const { getTotalRooms } = useRooms();
  const { getTotalPeople, getActivePeopleCount, getAveragePeoplePerRoom, getPeopleByRoom } = usePeople();
  const { currentUser } = useAuth();
  
  const [roomsCount, setRoomsCount] = useState(0);
  const [peopleCount, setPeopleCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [avgCount, setAvgCount] = useState(0);

  useEffect(() => {
    if (currentUser && currentUser.role === 'student' && currentUser.roomId) {
      const roomPeople = getPeopleByRoom(currentUser.roomId);
      setRoomsCount(1);
      setPeopleCount(roomPeople.length);
      setActiveCount(roomPeople.filter(p => p.status === 'active').length);
      setAvgCount(roomPeople.length);
    } else {
      setRoomsCount(getTotalRooms());
      setPeopleCount(getTotalPeople());
      setActiveCount(getActivePeopleCount());
      setAvgCount(getAveragePeoplePerRoom(getTotalRooms()));
    }
  }, [getTotalRooms, getTotalPeople, getActivePeopleCount, getAveragePeoplePerRoom, getPeopleByRoom, currentUser]);

  const progressPercentage = getUpdateProgressPercentage();

  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        {/* Top Section - Update Status */}
        <div className="dashboard-section update-section">
          <h2 className="section-title">Update Status</h2>
          <div className="update-info">
            <div className="update-countdown">
              <h3>Next Update Countdown</h3>
              <div className="countdown-box">
                <p className="countdown-text">{getCountdownText()}</p>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${updateStatus?.isOverdue ? 'overdue' : ''}`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="progress-text">{progressPercentage}% complete</p>
              </div>
            </div>

            <div className="update-details">
              <div className="detail-item">
                <span className="detail-label">Last Updated</span>
                <span className="detail-value">
                  {updateStatus?.lastUpdateDate ? formatDate(updateStatus.lastUpdateDate) : 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Next Update</span>
                <span className="detail-value">
                  {updateStatus?.nextUpdateDate ? formatDate(updateStatus.nextUpdateDate) : 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current Period</span>
                <span className="detail-value">
                  {updateStatus?.currentPeriodStart && updateStatus?.currentPeriodEnd
                    ? `${formatDate(updateStatus.currentPeriodStart)} - ${formatDate(updateStatus.currentPeriodEnd)}`
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - KPI Cards */}
        <div className="dashboard-section kpi-section">
          <h2 className="section-title">Key Metrics</h2>
          <div className="kpi-grid">
            <DashboardCard
              title="Total Rooms"
              value={roomsCount}
              icon="🏠"
              description="Active rooms in system"
              color="primary"
            />
            <DashboardCard
              title="Total People"
              value={peopleCount}
              icon="👥"
              description="Assigned people"
              color="success"
            />
            <DashboardCard
              title="Active People"
              value={activeCount}
              icon="✓"
              description="Currently active"
              color="secondary"
            />
            <DashboardCard
              title="Avg. per Room"
              value={avgCount}
              icon="📊"
              description="Average people per room"
              color="warning"
            />
          </div>
        </div>

        {/* Bottom Section - Room Distribution */}
        {(!currentUser || currentUser.role === 'admin') && statistics && (
          <div className="dashboard-section room-section">
            <h2 className="section-title">Room Distribution</h2>
            <div className="room-distribution">
              {statistics.roomStats && statistics.roomStats.length > 0 ? (
                <div className="room-list">
                  {statistics.roomStats.slice(0, 8).map((room, idx) => (
                    <div key={idx} className="room-item">
                      <span className="room-label">Room {idx + 1}</span>
                      <span className="room-bar">
                        <span
                          className="room-bar-fill"
                          style={{
                            width: `${Math.min(100, (room.count / roomsCount) * 100)}%`
                          }}
                        ></span>
                      </span>
                      <span className="room-count">{room.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No room data available</p>
              )}
            </div>
          </div>
        )}

        {/* Update Notification */}
        {updateOccurred && (
          <div className="dashboard-section notification-section update-notification">
            <div className="notification-content">
              <span className="notification-icon">✓</span>
              <div>
                <h3>List Updated!</h3>
                <p>Your name list has been automatically updated for the new period.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
