# Room Name List Automation System

A modern, fully-responsive React application that automatically manages room-wise name lists with automatic 15-day updates.

## 🎯 Features

### Core Functionality
- **Automatic 15-Day Updates**: List automatically regenerates every 15 days without manual intervention
- **Room Management**: Create, edit, delete, and manage rooms with capacity tracking
- **Person Management**: Add, edit, delete, and transfer people between rooms
- **List History**: View and retrieve all previous name lists
- **Smart Scheduling**: Tracks update dates and automatically triggers updates based on system date

### User Interface
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Dashboard**: Real-time KPIs, update countdown, and room distribution charts
- **Search & Filter**: Advanced search and filter capabilities for rooms and people
- **Data Export/Import**: Backup and restore data with JSON exports
- **Clean Navigation**: Intuitive sidebar navigation and header with update status

### Data Management
- **localStorage Persistence**: All data persists across browser sessions
- **No Backend Required**: Fully client-side application
- **Data Snapshot History**: Preserves previous lists when new periods are generated
- **Real-time Sync**: All changes immediately reflected in storage

## 📋 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Sidebar.js          # Navigation sidebar
│   ├── Header.js           # Top header with status
│   ├── Modal.js            # Generic modal wrapper
│   ├── DashboardCard.js    # KPI card component
│   ├── RoomTable.js        # Room listing table
│   ├── NameListTable.js    # Person listing table
│   ├── SearchBar.js        # Search input component
│   ├── FilterBar.js        # Filter selection component
│   ├── Notification.js     # Toast notifications
│   ├── HistoryCard.js      # History period card
│   ├── AddRoomModal.js     # Room form modal
│   ├── AddPersonModal.js   # Person form modal
│   └── TransferPersonModal.js # Transfer form modal
│
├── pages/                  # Application pages
│   ├── Dashboard.js        # Main dashboard page
│   ├── Rooms.js            # Room management page
│   ├── NameList.js         # Person management page
│   ├── History.js          # History viewing page
│   └── Settings.js         # Settings & configuration
│
├── hooks/                  # Custom React hooks
│   ├── useRooms.js         # Room management hook
│   ├── usePeople.js        # Person management hook
│   ├── useListGeneration.js # Auto-update logic hook
│   └── useNotification.js  # Notification management hook
│
├── utils/                  # Utility functions
│   ├── dateUtils.js        # Date calculations
│   ├── storage.js          # localStorage wrapper
│   ├── listGenerator.js    # 15-day update logic
│   ├── validators.js       # Input validation
│   └── sampleData.js       # Demo data
│
├── App.js                  # Main application component
└── index.js               # React entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to project directory**
   ```bash
   cd "path/to/Automation"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

### Loading Sample Data

The application automatically loads sample data on first run. To reload demo data:
- Visit: `http://localhost:3000?demo=true`
- Or clear localStorage and refresh the page

## 📖 How to Use

### Dashboard
- View real-time KPIs (total rooms, people, etc.)
- See countdown to next automatic update
- Monitor room distribution and update status
- Track current and next update dates

### Room Management
- **Add Room**: Click "+ Add New Room" button
- **Edit Room**: Click edit icon (✏️) on any room row
- **Delete Room**: Click delete icon (🗑️) to remove room
- **Search**: Use search bar to find rooms by number or name

### Name List Management
- **Add Person**: Click "+ Add New Person" button (requires rooms first)
- **Edit Person**: Click edit icon to modify details
- **Transfer**: Click transfer icon (🔄) to move person to another room
- **Delete Person**: Click delete icon to remove person
- **Filter**: Use filter bar to filter by room or status

### History
- View all previous 15-day periods
- Click to expand period details
- View room distribution for each period
- See all people assigned during each period
- Click "View Full Details" for comprehensive list

### Settings
- **Export Data**: Download backup as JSON file
- **Import Data**: Restore from previously exported file
- **Clear Data**: Reset application to initial state
- **View Features**: See application capabilities

## 🔄 15-Day Automation Logic

### How It Works
1. **System Start**: Records today's date as start date
2. **Period Duration**: Lists remain active for 15 days
3. **Auto-Update**: When 15 days pass, system automatically:
   - Archives current list to history
   - Creates new list period starting today
   - Updates metadata with new dates
   - Keeps all people in their current rooms
4. **Update Check**: Happens on every app load and every hour while running

### Data Preservation
- Previous lists are **never deleted**
- All data is **snapshots** at time of update
- Complete history is **always available** in History page
- Old records can be **exported** for backup

## 💾 Data Structure

### Rooms
```javascript
{
  id: "uuid",
  roomNumber: "101",
  roomName: "Building A - Floor 1",
  capacity: 25,
  createdDate: "2026-08-01",
  isActive: true
}
```

### People
```javascript
{
  id: "uuid",
  name: "John Doe",
  registrationNumber: "REG001",
  roomId: "uuid",
  assignedDate: "2026-08-01",
  listPeriod: "2026-08-01",
  status: "active" // or "transferred", "inactive"
}
```

### List Periods
```javascript
{
  id: "uuid",
  startDate: "2026-08-01",
  endDate: "2026-08-15",
  isActive: true,
  generatedDate: "2026-08-01",
  nextUpdateDate: "2026-08-16",
  people: [...] // snapshot of people
}
```

## 🎨 Customization

### Color Scheme
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary: #2563eb;        /* Main blue */
  --secondary: #f59e0b;      /* Amber */
  --success: #10b981;        /* Green */
  --danger: #ef4444;         /* Red */
}
```

### Update Interval
Change from 15 days in `src/utils/listGenerator.js`:
```javascript
const newEndDate = addDays(startDate, X); // X = days - 1
```

## 📱 Responsive Design

- **Desktop** (>768px): Full layout with sidebar
- **Tablet** (768px-481px): Collapsed sidebar
- **Mobile** (<480px): Bottom navigation, optimized for touch

All layouts tested and optimized for usability.

## 🔒 Data & Privacy

- All data stored in **browser's localStorage**
- No data sent to any server
- Completely **offline-first** application
- Data persists across browser sessions
- Users can export data anytime

## 🛠️ Technology Stack

- **React 18**: Modern UI library
- **JavaScript (ES6+)**: No TypeScript requirement
- **CSS 3**: Responsive design with Grid & Flexbox
- **localStorage API**: Client-side data persistence
- **React Hooks**: Functional component patterns

## 📝 Features Breakdown

| Feature | Status |
|---------|--------|
| Automatic 15-day updates | ✅ Complete |
| Room CRUD operations | ✅ Complete |
| Person CRUD operations | ✅ Complete |
| Person transfer between rooms | ✅ Complete |
| Search functionality | ✅ Complete |
| Filter functionality | ✅ Complete |
| History tracking | ✅ Complete |
| Data export/import | ✅ Complete |
| Responsive design | ✅ Complete |
| localStorage persistence | ✅ Complete |
| Real-time notifications | ✅ Complete |
| Dashboard with KPIs | ✅ Complete |

## 🐛 Troubleshooting

### Data not persisting
- Check browser localStorage is enabled
- Verify you're not in private/incognito mode
- Clear cache and reload page

### Updates not triggering
- Check browser console for errors
- Ensure system date is correct
- App checks for updates on load and every hour

### Sample data not loading
- Visit URL with `?demo=true` parameter
- Or clear localStorage before first load
- Refresh the page

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 📄 License

This project is provided as-is for educational and operational use.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Verify data in browser's Application > Storage > localStorage

## ✨ Version

**Room Name List Automation System v1.0.0**

---

Built with ❤️ using React.js
