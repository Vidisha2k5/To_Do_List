// Demo data for showcasing My Days features
// Run this in the browser console to load sample tasks

function loadDemoData() {
    const demoTasks = [
        {
            id: "1",
            title: "Complete quarterly sales report",
            description: "Compile Q4 sales data, analyze trends, and prepare presentation for stakeholders meeting",
            category: "work",
            priority: "high",
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 2 days from now
            completed: false,
            createdAt: new Date().toISOString(),
            notified: false
        },
        {
            id: "2",
            title: "Weekly grocery shopping",
            description: "Buy organic vegetables, fresh fruits, dairy products, and household cleaning supplies",
            category: "shopping",
            priority: "medium",
            dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // Tomorrow
            completed: false,
            createdAt: new Date().toISOString(),
            notified: false
        },
        {
            id: "3",
            title: "Study JavaScript advanced concepts",
            description: "Review closures, prototypes, async/await, and ES6+ features for upcoming certification",
            category: "study",
            priority: "medium",
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 3 days from now
            completed: false,
            createdAt: new Date().toISOString(),
            notified: false
        },
        {
            id: "4",
            title: "Morning workout routine",
            description: "30 minutes cardio followed by strength training - chest and triceps focus",
            category: "health",
            priority: "high",
            dueDate: new Date(Date.now() + 0.5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 12 hours from now
            completed: true,
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
            notified: false
        },
        {
            id: "5",
            title: "Plan weekend family trip",
            description: "Research mountain destinations, book family-friendly accommodation, and create fun itinerary",
            category: "personal",
            priority: "low",
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 1 week from now
            completed: false,
            createdAt: new Date().toISOString(),
            notified: false
        },
        {
            id: "6",
            title: "Update LinkedIn profile and resume",
            description: "Add recent projects, update skills section, and proofread for job applications",
            category: "work",
            priority: "medium",
            dueDate: null, // No due date
            completed: false,
            createdAt: new Date().toISOString(),
            notified: false
        },
        {
            id: "7",
            title: "Call mom for weekly check-in",
            description: "Weekly family call to catch up and share updates",
            category: "personal",
            priority: "high",
            dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // Yesterday (overdue)
            completed: false,
            createdAt: new Date().toISOString(),
            notified: false
        },
        {
            id: "8",
            title: "Read 'Getting Things Done' productivity book",
            description: "Finish reading GTD methodology and implement key strategies",
            category: "study",
            priority: "low",
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 2 weeks from now
            completed: false,
            createdAt: new Date().toISOString(),
            notified: false
        },
        {
            id: "9",
            title: "Organize family vacation photos",
            description: "Sort and backup photos from summer trip, create photo album",
            category: "personal",
            priority: "low",
            dueDate: null,
            completed: true,
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
            notified: false
        },
        {
            id: "10",
            title: "Schedule annual health checkup",
            description: "Book appointment with primary care physician for annual wellness exam",
            category: "health",
            priority: "high",
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 1 month from now
            completed: false,
            createdAt: new Date().toISOString(),
            notified: false
        },
        {
            id: "11",
            title: "Buy birthday gifts for sister",
            description: "Find thoughtful birthday presents and wrapping supplies",
            category: "shopping",
            priority: "medium",
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 5 days from now
            completed: false,
            createdAt: new Date().toISOString(),
            notified: false
        },
        {
            id: "12",
            title: "Research React 18 new features",
            description: "Learn about concurrent rendering, automatic batching, and new hooks",
            category: "study",
            priority: "medium",
            dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 10 days from now
            completed: false,
            createdAt: new Date().toISOString(),
            notified: false
        }
    ];

    // Store the demo tasks
    localStorage.setItem('myDaysTasks', JSON.stringify(demoTasks));
    
    // Reload the page to show demo data
    if (confirm('Demo data has been loaded! Click OK to refresh the page and see the sample tasks.')) {
        window.location.reload();
    }
}

// Instructions for use
console.log(`
🎉 My Days - Demo Data
=====================

To load sample tasks and see all features in action:

1. Open the browser console (F12)
2. Type: loadDemoData()
3. Press Enter

This will load 12 sample tasks with:
- Different categories (work, personal, study, health, shopping)
- Various priorities (low, medium, high)
- Different due dates (including overdue and completed tasks)
- Mix of completed and pending tasks

The demo data showcases:
✅ Completed tasks
⏰ Overdue tasks
📅 Tasks due soon
🎯 Different priority levels
🏷️ Category organization
📊 Progress tracking
🔍 Search and filter functionality
`);

// Make function available globally
window.loadDemoData = loadDemoData;