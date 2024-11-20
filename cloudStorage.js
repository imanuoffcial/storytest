// This will handle the "cloud" storage for public stories
class CloudStorage {
    constructor() {
        // Initialize cloud storage if it doesn't exist
        if (!localStorage.getItem('cloudStories')) {
            localStorage.setItem('cloudStories', JSON.stringify([]));
        }
    }

    // Upload a story to the cloud (public space)
    uploadStory(story) {
        const cloudStories = JSON.parse(localStorage.getItem('cloudStories') || '[]');
        const cloudStory = {
            ...story,
            uploadDate: new Date().toISOString(),
            uploadId: `cloud_${Date.now()}`
        };
        cloudStories.push(cloudStory);
        localStorage.setItem('cloudStories', JSON.stringify(cloudStories));
        return cloudStory;
    }

    // Get all public stories
    getAllStories() {
        return JSON.parse(localStorage.getItem('cloudStories') || '[]');
    }

    // Delete a story from cloud (if needed later)
    deleteStory(uploadId) {
        const cloudStories = JSON.parse(localStorage.getItem('cloudStories') || '[]');
        const filteredStories = cloudStories.filter(story => story.uploadId !== uploadId);
        localStorage.setItem('cloudStories', JSON.stringify(filteredStories));
    }
}

// Export for use in other files
window.CloudStorage = new CloudStorage(); 