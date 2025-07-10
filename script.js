// My Days - Smart Task Manager Application
class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.currentCategory = '';
        this.searchQuery = '';
        this.notificationsEnabled = false;
        this.editingTaskId = null;
        this.taskChart = null;
        this.sortable = null;
        
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.setupTheme();
        this.setupNotifications();
        this.setupSortable();
        this.renderTasks();
        this.updateStats();
        this.renderChart();
        this.showSuggestions();
        this.startNotificationTimer();
    }

    // Data Management
    loadFromStorage() {
        const savedTasks = localStorage.getItem('myDaysTasks');
        const savedTheme = localStorage.getItem('myDaysTheme');
        const savedNotifications = localStorage.getItem('myDaysNotifications');
        
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
        
        if (savedNotifications) {
            this.notificationsEnabled = JSON.parse(savedNotifications);
        }
    }

    saveToStorage() {
        localStorage.setItem('myDaysTasks', JSON.stringify(this.tasks));
        localStorage.setItem('myDaysTheme', document.documentElement.getAttribute('data-theme') || 'light');
        localStorage.setItem('myDaysNotifications', JSON.stringify(this.notificationsEnabled));
    }

    // Event Listeners
    setupEventListeners() {
        // Form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Edit form submission
        document.getElementById('editTaskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEditedTask();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Notification toggle
        document.getElementById('notificationToggle').addEventListener('click', () => {
            this.toggleNotifications();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderTasks();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.renderTasks();
        });

        // Modal controls
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.closeModal();
        });

        // Notification modal
        document.getElementById('notificationModalClose').addEventListener('click', () => {
            this.closeNotificationModal();
        });

        document.getElementById('notificationAllow').addEventListener('click', () => {
            this.enableNotifications();
        });

        document.getElementById('notificationDeny').addEventListener('click', () => {
            this.closeNotificationModal();
        });

        // Click outside modal to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
                this.closeNotificationModal();
            }
        });
    }

    // Theme Management
    setupTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const themeIcon = document.querySelector('#themeToggle i');
        
        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        const themeIcon = document.querySelector('#themeToggle i');
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        this.saveToStorage();
        this.renderChart(); // Re-render chart with new theme
    }

    // Notification Management
    setupNotifications() {
        if (this.notificationsEnabled) {
            document.getElementById('notificationToggle').classList.add('active');
        }
    }

    toggleNotifications() {
        if (!this.notificationsEnabled) {
            document.getElementById('notificationModal').classList.add('active');
        } else {
            this.disableNotifications();
        }
    }

    enableNotifications() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.notificationsEnabled = true;
                    document.getElementById('notificationToggle').classList.add('active');
                    this.saveToStorage();
                    this.showNotification('Notifications enabled!', 'You\'ll be notified when tasks are due soon.');
                }
            });
        }
        this.closeNotificationModal();
    }

    disableNotifications() {
        this.notificationsEnabled = false;
        document.getElementById('notificationToggle').classList.remove('active');
        this.saveToStorage();
    }

    closeNotificationModal() {
        document.getElementById('notificationModal').classList.remove('active');
    }

    showNotification(title, body) {
        if (this.notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMTUyLjEgMzguMkM5MS4zIDc0LjggNDUuMiAxMzIuNyA0NS4yIDIwMHMtMTQuMiAzMy45IDAgNDYuM2wxNjAgMTYwYzEyLjQgMTIuNCAwIDI1LjkgMCAzOC4zIDAgMTIuNCA2MCAzOC4zIDc0LjcgMzguM3MxMC40LTI1LjkgMjIuNy0zOC4zbDE2MC0xNjBjMTIuNC0xMi40IDEyLjQtMzMuOSAwLTQ2LjNMMzAyLjYgNzguMkMyOTAuMiA2NS44IDI2OC43IDY1LjggMjU2LjMgNzguMkwxNTIuMSAzOC4yeiIgZmlsbD0iIzZGNkZGMSIvPjwvc3ZnPg==',
                badge: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMTUyLjEgMzguMkM5MS4zIDc0LjggNDUuMiAxMzIuNyA0NS4yIDIwMHMtMTQuMiAzMy45IDAgNDYuM2wxNjAgMTYwYzEyLjQgMTIuNCAwIDI1LjkgMCAzOC4zIDAgMTIuNCA2MCAzOC4zIDc0LjcgMzguM3MxMC40LTI1LjkgMjIuNy0zOC4zbDE2MC0xNjBjMTIuNC0xMi40IDEyLjQtMzMuOSAwLTQ2LjNMMzAyLjYgNzguMkMyOTAuMiA2NS44IDI2OC43IDY1LjggMjU2LjMgNzguMkwxNTIuMSAzOC4yeiIgZmlsbD0iIzZGNkZGMSIvPjwvc3ZnPg=='
            });
        }
    }

    startNotificationTimer() {
        setInterval(() => {
            if (this.notificationsEnabled) {
                this.checkDueTasks();
            }
        }, 60000); // Check every minute
    }

    checkDueTasks() {
        const now = new Date();
        const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

        this.tasks.forEach(task => {
            if (!task.completed && task.dueDate && !task.notified) {
                const dueDate = new Date(task.dueDate);
                if (dueDate <= oneHourFromNow && dueDate > now) {
                    this.showNotification(
                        `Task Due Soon: ${task.title}`,
                        `Due at ${dueDate.toLocaleTimeString()}`
                    );
                    task.notified = true;
                    this.saveToStorage();
                }
            }
        });
    }

    // Drag and Drop
    setupSortable() {
        const tasksContainer = document.getElementById('tasksContainer');
        this.sortable = new Sortable(tasksContainer, {
            animation: 150,
            ghostClass: 'task-item-ghost',
            onEnd: (evt) => {
                const taskId = evt.item.dataset.taskId;
                const newIndex = evt.newIndex;
                
                // Find the task and move it to the new position
                const taskIndex = this.tasks.findIndex(task => task.id === taskId);
                if (taskIndex !== -1) {
                    const [task] = this.tasks.splice(taskIndex, 1);
                    this.tasks.splice(newIndex, 0, task);
                    this.saveToStorage();
                }
            }
        });
    }

    // Task Management
    addTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const category = document.getElementById('taskCategory').value;
        const priority = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;

        if (!title) return;

        const task = {
            id: Date.now().toString(),
            title,
            description,
            category,
            priority,
            dueDate: dueDate || null,
            completed: false,
            createdAt: new Date().toISOString(),
            notified: false
        };

        this.tasks.unshift(task);
        this.saveToStorage();
        this.renderTasks();
        this.updateStats();
        this.renderChart();
        this.showSuggestions();
        
        // Reset form
        document.getElementById('taskForm').reset();
        
        // Show success message
        this.showNotification('Task Added!', `"${title}" has been added to your list.`);
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        this.editingTaskId = taskId;
        
        // Populate edit form
        document.getElementById('editTaskTitle').value = task.title;
        document.getElementById('editTaskDescription').value = task.description || '';
        document.getElementById('editTaskCategory').value = task.category || '';
        document.getElementById('editTaskPriority').value = task.priority;
        document.getElementById('editTaskDueDate').value = task.dueDate || '';
        
        // Show modal
        document.getElementById('editModal').classList.add('active');
    }

    saveEditedTask() {
        const taskIndex = this.tasks.findIndex(t => t.id === this.editingTaskId);
        if (taskIndex === -1) return;

        const title = document.getElementById('editTaskTitle').value.trim();
        if (!title) return;

        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            title,
            description: document.getElementById('editTaskDescription').value.trim(),
            category: document.getElementById('editTaskCategory').value,
            priority: document.getElementById('editTaskPriority').value,
            dueDate: document.getElementById('editTaskDueDate').value || null,
            notified: false // Reset notification flag when editing
        };

        this.saveToStorage();
        this.renderTasks();
        this.updateStats();
        this.renderChart();
        this.showSuggestions();
        this.closeModal();
        
        this.showNotification('Task Updated!', `"${title}" has been updated.`);
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
        
        this.saveToStorage();
        this.renderTasks();
        this.updateStats();
        this.renderChart();
        this.showSuggestions();
        
        if (task.completed) {
            this.showNotification('Task Completed!', `"${task.title}" has been marked as complete.`);
        }
    }

    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return;

        const task = this.tasks[taskIndex];
        this.tasks.splice(taskIndex, 1);
        
        this.saveToStorage();
        this.renderTasks();
        this.updateStats();
        this.renderChart();
        this.showSuggestions();
        
        this.showNotification('Task Deleted!', `"${task.title}" has been removed from your list.`);
    }

    duplicateTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        const duplicatedTask = {
            ...task,
            id: Date.now().toString(),
            title: `${task.title} (Copy)`,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null,
            notified: false
        };

        this.tasks.unshift(duplicatedTask);
        this.saveToStorage();
        this.renderTasks();
        this.updateStats();
        this.renderChart();
        this.showSuggestions();
        
        this.showNotification('Task Duplicated!', `"${duplicatedTask.title}" has been added to your list.`);
    }

    // Modal Management
    closeModal() {
        document.getElementById('editModal').classList.remove('active');
        this.editingTaskId = null;
    }

    // Filtering and Search
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderTasks();
    }

    getFilteredTasks() {
        let filteredTasks = this.tasks;

        // Apply search filter
        if (this.searchQuery) {
            filteredTasks = filteredTasks.filter(task => 
                task.title.toLowerCase().includes(this.searchQuery) ||
                (task.description && task.description.toLowerCase().includes(this.searchQuery))
            );
        }

        // Apply category filter
        if (this.currentCategory) {
            filteredTasks = filteredTasks.filter(task => task.category === this.currentCategory);
        }

        // Apply status filter
        const now = new Date();
        switch (this.currentFilter) {
            case 'completed':
                filteredTasks = filteredTasks.filter(task => task.completed);
                break;
            case 'pending':
                filteredTasks = filteredTasks.filter(task => !task.completed);
                break;
            case 'overdue':
                filteredTasks = filteredTasks.filter(task => 
                    !task.completed && task.dueDate && new Date(task.dueDate) < now
                );
                break;
            case 'today':
                filteredTasks = filteredTasks.filter(task => {
                    if (!task.dueDate) return false;
                    const dueDate = new Date(task.dueDate);
                    return dueDate.toDateString() === now.toDateString();
                });
                break;
        }

        return filteredTasks;
    }

    // Rendering
    renderTasks() {
        const tasksContainer = document.getElementById('tasksContainer');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            tasksContainer.style.display = 'none';
            emptyState.style.display = 'block';
            this.updateMotivationalQuote();
        } else {
            tasksContainer.style.display = 'block';
            emptyState.style.display = 'none';
            
            tasksContainer.innerHTML = filteredTasks.map(task => this.renderTaskItem(task)).join('');
        }
    }

    renderTaskItem(task) {
        const now = new Date();
        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
        const isOverdue = dueDate && dueDate < now && !task.completed;
        const isDueSoon = dueDate && dueDate > now && dueDate <= new Date(now.getTime() + 24 * 60 * 60 * 1000);
        
        let taskClasses = 'task-item';
        if (task.completed) taskClasses += ' completed';
        if (isOverdue) taskClasses += ' overdue';
        if (isDueSoon) taskClasses += ' due-soon';

        return `
            <div class="${taskClasses}" data-task-id="${task.id}">
                <div class="task-header">
                    <div class="task-info">
                        <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                        ${task.description ? `<p class="task-description">${this.escapeHtml(task.description)}</p>` : ''}
                    </div>
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                           onchange="todoApp.toggleTask('${task.id}')">
                </div>
                
                <div class="task-meta">
                    ${task.category ? `<span class="task-category ${task.category}">
                        <i class="fas fa-tag"></i> ${this.capitalize(task.category)}
                    </span>` : ''}
                    
                    <span class="task-priority ${task.priority}">
                        <i class="fas fa-flag"></i> ${this.capitalize(task.priority)}
                    </span>
                    
                    ${task.dueDate ? `<span class="task-due-date ${isOverdue ? 'overdue' : isDueSoon ? 'due-soon' : ''}">
                        <i class="fas fa-calendar"></i> ${this.formatDate(dueDate)}
                    </span>` : ''}
                </div>
                
                <div class="task-actions">
                    <button class="btn btn-secondary" onclick="todoApp.editTask('${task.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-secondary" onclick="todoApp.duplicateTask('${task.id}')">
                        <i class="fas fa-copy"></i> Duplicate
                    </button>
                    <button class="btn btn-secondary" onclick="todoApp.deleteTask('${task.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }

    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        const now = new Date();
        const overdueTasks = this.tasks.filter(task => 
            !task.completed && task.dueDate && new Date(task.dueDate) < now
        ).length;

        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('pendingTasks').textContent = pendingTasks;
        document.getElementById('overdueTasks').textContent = overdueTasks;

        const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        document.getElementById('progressFill').style.width = `${progressPercentage}%`;
        document.getElementById('progressText').textContent = `${progressPercentage}%`;
    }

    renderChart() {
        const ctx = document.getElementById('taskChart').getContext('2d');
        
        if (this.taskChart) {
            this.taskChart.destroy();
        }

        const categories = ['work', 'personal', 'study', 'health', 'shopping'];
        const categoryColors = {
            work: '#3b82f6',
            personal: '#10b981',
            study: '#8b5cf6',
            health: '#f59e0b',
            shopping: '#ef4444'
        };

        const categoryData = categories.map(category => 
            this.tasks.filter(task => task.category === category).length
        );

        const hasData = categoryData.some(count => count > 0);
        
        if (!hasData) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('No tasks to display', ctx.canvas.width / 2, ctx.canvas.height / 2);
            return;
        }

        this.taskChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categories.map(cat => this.capitalize(cat)),
                datasets: [{
                    data: categoryData,
                    backgroundColor: categories.map(cat => categoryColors[cat]),
                    borderWidth: 2,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--background-primary')
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'),
                            padding: 20
                        }
                    }
                }
            }
        });
    }

    // Smart Suggestions
    showSuggestions() {
        const suggestionsContainer = document.getElementById('suggestionsContainer');
        const suggestions = this.generateSuggestions();

        if (suggestions.length === 0) {
            document.getElementById('suggestionsSection').style.display = 'none';
            return;
        }

        document.getElementById('suggestionsSection').style.display = 'block';
        suggestionsContainer.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item">
                <h4>${suggestion.title}</h4>
                <p>${suggestion.description}</p>
            </div>
        `).join('');
    }

    generateSuggestions() {
        const suggestions = [];
        const now = new Date();
        const pendingTasks = this.tasks.filter(task => !task.completed);
        const overdueTasks = this.tasks.filter(task => 
            !task.completed && task.dueDate && new Date(task.dueDate) < now
        );

        // Suggest breaking down large tasks
        const largeTasks = pendingTasks.filter(task => 
            task.title.length > 50 || (task.description && task.description.length > 100)
        );
        
        if (largeTasks.length > 0) {
            suggestions.push({
                title: 'Break Down Large Tasks',
                description: `You have ${largeTasks.length} large task(s). Consider breaking them into smaller, manageable subtasks.`
            });
        }

        // Suggest prioritizing overdue tasks
        if (overdueTasks.length > 0) {
            suggestions.push({
                title: 'Focus on Overdue Tasks',
                description: `You have ${overdueTasks.length} overdue task(s). Consider prioritizing these to get back on track.`
            });
        }

        // Suggest setting due dates
        const tasksWithoutDueDate = pendingTasks.filter(task => !task.dueDate);
        if (tasksWithoutDueDate.length > 0) {
            suggestions.push({
                title: 'Set Due Dates',
                description: `${tasksWithoutDueDate.length} task(s) don't have due dates. Adding deadlines can help you stay organized.`
            });
        }

        // Suggest categorizing tasks
        const uncategorizedTasks = pendingTasks.filter(task => !task.category);
        if (uncategorizedTasks.length > 0) {
            suggestions.push({
                title: 'Categorize Your Tasks',
                description: `${uncategorizedTasks.length} task(s) are uncategorized. Adding categories can help you organize better.`
            });
        }

        return suggestions;
    }

    updateMotivationalQuote() {
        const quotes = [
            "A journey of a thousand miles begins with a single step.",
            "The secret of getting ahead is getting started.",
            "Don't wait for opportunity. Create it.",
            "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            "The only way to do great work is to love what you do.",
            "Your limitation—it's only your imagination.",
            "Push yourself, because no one else is going to do it for you.",
            "Great things never come from comfort zones.",
            "Dream it. Wish it. Do it.",
            "Success doesn't just find you. You have to go out and get it."
        ];

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('motivationalQuote').textContent = randomQuote;
    }

    // Utility Functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    formatDate(date) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        const taskDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        if (taskDate.getTime() === today.getTime()) {
            return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (taskDate.getTime() === tomorrow.getTime()) {
            return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
});

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
}