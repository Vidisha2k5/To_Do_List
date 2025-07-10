# My Days - Smart Task Manager

A beautiful and intuitive task management app that helps you organize your days with smart suggestions, notifications, and productivity tracking.

## 🚀 Features

### ✅ Core Features
- **Task Management**: Add, edit, delete, and mark tasks as complete
- **Clean UI**: Modern, responsive design with smooth animations
- **Data Persistence**: Tasks are saved using localStorage
- **Drag & Drop**: Reorder tasks by dragging them

### 🌟 Advanced Features

#### 📅 Due Dates & Visual Indicators
- Set due dates for tasks
- Visual highlighting:
  - **Red**: Overdue tasks
  - **Yellow**: Due soon (within 24 hours)
  - **Green**: Completed tasks

#### 🧠 Smart Suggestions
- Break down large tasks into subtasks
- Prioritize overdue tasks
- Set due dates for tasks without deadlines
- Categorize uncategorized tasks
- Motivational quotes when task list is empty

#### 🔔 Browser Notifications
- Notifications for tasks due within 1 hour
- Toggle notifications on/off
- Permission-based system

#### 📂 Categories & Tags
- Organize tasks by category:
  - Work
  - Personal
  - Study
  - Health
  - Shopping
- Filter tasks by category
- Color-coded category system

#### 🌗 Dark Mode
- Toggle between light and dark themes
- Automatic theme persistence
- Smooth theme transitions

#### 📊 Progress Tracking
- Visual progress bar showing completion percentage
- Task statistics dashboard
- Interactive pie chart showing task distribution by category

#### 🔍 Search & Filter
- Search tasks by title or description
- Filter by status:
  - All tasks
  - Pending
  - Completed
  - Overdue
  - Due today
- Combined search and filter functionality

#### 🎯 Priority Management
- Three priority levels: Low, Medium, High
- Color-coded priority indicators
- Priority-based task organization

## 🛠️ Technical Features

### PWA Capabilities
- **Service Worker**: Offline functionality
- **Web App Manifest**: Installable as native app
- **Responsive Design**: Works on all devices

### Performance
- **Lightweight**: No heavy frameworks
- **Fast Loading**: Optimized CSS and JavaScript
- **Smooth Animations**: Hardware-accelerated transitions

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper ARIA labels
- **Focus Management**: Clear focus indicators

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🚀 Getting Started

1. Clone or download My Days
2. Open `index.html` in your web browser
3. Start organizing your days and exploring features!

## 💡 Usage Tips

### Adding Tasks
1. Fill in the task title (required)
2. Add a description (optional)
3. Select a category
4. Set priority level
5. Choose a due date
6. Click "Add Task"

### Smart Suggestions
- Check the suggestions section for productivity tips
- Suggestions adapt based on your current tasks
- Break down large tasks for better management

### Notifications
- Click the bell icon to enable notifications
- Grant permission when prompted
- You'll be notified when tasks are due within 1 hour

### Theme Switching
- Click the moon/sun icon to toggle themes
- Your preference is automatically saved

### Search & Filter
- Use the search box to find specific tasks
- Combine filters for precise task views
- Category filter works with other filters

## 🎨 Customization

### Adding New Categories
Edit the category options in both HTML and JavaScript:
```javascript
// In script.js, add to categories array
const categories = ['work', 'personal', 'study', 'health', 'shopping', 'your-category'];
```

### Custom Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #your-color;
    --accent-color: #your-accent;
}
```

## 🔧 Development

### File Structure
```
├── index.html          # Main HTML file
├── styles.css          # CSS styles with theme support
├── script.js           # JavaScript functionality
├── sw.js              # Service Worker for PWA
├── manifest.json      # Web App Manifest
└── README.md          # This file
```

### Key Classes
- `TodoApp`: Main application class
- Task management methods
- Theme management
- Notification system
- Chart rendering
- Filter and search logic

## 🚀 Future Enhancements

- **Cloud Sync**: Sync tasks across devices
- **Team Collaboration**: Share tasks with others
- **Advanced Analytics**: Detailed productivity insights
- **Custom Themes**: User-defined color schemes
- **Export/Import**: Backup and restore functionality
- **Voice Commands**: Add tasks via voice input

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 📞 Support

For support or questions, please create an issue in the repository.

---

**Built with ❤️ for productivity enthusiasts**