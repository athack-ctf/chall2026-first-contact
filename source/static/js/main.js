// Xyrathian Surveillance Network - Main Control
// Authentication data fragments configured in config.js

function initializeDashboard() {
    console.log('Initializing surveillance dashboard...');
    
    // Fetch storage fragment from server
    fetchStorageFragment();
}

async function fetchStorageFragment() {
    try {
        const response = await fetch('/api/storage');
        const data = await response.json();
        
        // Store third fragment in localStorage
        if (data.fragment) {
            localStorage.setItem('data_fragment_part3', data.fragment);
        }
        
        console.log('Storage initialization complete');
    } catch (error) {
        console.error('Storage initialization failed:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeDashboard);
