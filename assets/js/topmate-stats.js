// Topmate Stats Fetcher
async function fetchTopmateStats() {
    try {
        // Fetch the stats from our static JSON file
        const response = await fetch('/assets/data/topmate_stats.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const stats = await response.json();
        
        // Update the counters
        updateCounter('bookings', stats.bookings);
        updateCounter('reviews', stats.reviews);
        updateCounter('rating', stats.rating);
        
        // Update happy students (assuming 78% conversion rate)
        updateCounter('happy-students', Math.floor(stats.bookings * 0.78));
        
        // Check if stats are stale (older than 24 hours)
        const lastUpdated = new Date(stats.last_updated);
        const now = new Date();
        if (now - lastUpdated > 24 * 60 * 60 * 1000) {
            console.warn('Topmate stats are more than 24 hours old');
        }
        
    } catch (error) {
        console.error('Error fetching Topmate stats:', error);
        // Fallback to default values
        updateCounter('bookings', 699);
        updateCounter('reviews', 87);
        updateCounter('rating', 4.8);
        updateCounter('happy-students', 545);
    }
}

function updateCounter(id, value) {
    const element = document.querySelector(`[data-counter-id="${id}"]`);
    if (element) {
        if (id === 'rating') {
            element.textContent = value.toFixed(1) + '/5';
        } else {
            // Update the purecounter end value
            element.setAttribute('data-purecounter-end', value);
            // Trigger purecounter update
            new PureCounter({
                selector: `[data-counter-id="${id}"]`,
                start: 0,
                end: value,
                duration: 3,
                delay: 10,
                once: true,
                repeat: false,
                decimals: 0,
                legacy: true,
            });
        }
    }
}

// Fetch stats every 5 minutes
setInterval(fetchTopmateStats, 300000);

// Initial fetch
document.addEventListener('DOMContentLoaded', () => {
    // Show loading state
    ['happy-students', 'bookings', 'reviews'].forEach(id => {
        const element = document.querySelector(`[data-counter-id="${id}"]`);
        if (element) {
            element.textContent = 'Loading...';
        }
    });
    
    fetchTopmateStats();
}); 