// Create a shared storage for all users
class SharedStorage {
    constructor() {
        // Use a specific key for shared stories
        this.SHARED_KEY = 'GLOBAL_SHARED_STORIES';
        
        // Initialize if needed
        if (!localStorage.getItem(this.SHARED_KEY)) {
            localStorage.setItem(this.SHARED_KEY, JSON.stringify([]));
        }
    }

    // Add a story to shared storage
    addStory(story) {
        const sharedStories = this.getAllStories();
        const sharedStory = {
            ...story,
            uploadDate: new Date().toISOString(),
            sharedId: `shared_${Date.now()}`
        };
        sharedStories.push(sharedStory);
        
        // Save to both regular localStorage and sessionStorage for persistence
        localStorage.setItem(this.SHARED_KEY, JSON.stringify(sharedStories));
        sessionStorage.setItem(this.SHARED_KEY, JSON.stringify(sharedStories));
        
        return sharedStory;
    }

    // Get all shared stories
    getAllStories() {
        // Try to get from both storage types
        const localStories = JSON.parse(localStorage.getItem(this.SHARED_KEY) || '[]');
        const sessionStories = JSON.parse(sessionStorage.getItem(this.SHARED_KEY) || '[]');
        
        // Combine and remove duplicates
        const allStories = [...localStories, ...sessionStories];
        const uniqueStories = Array.from(new Set(allStories.map(s => s.sharedId)))
            .map(id => allStories.find(s => s.sharedId === id));
            
        return uniqueStories;
    }
}

// Create global instance
window.SharedStorage = new SharedStorage(); 