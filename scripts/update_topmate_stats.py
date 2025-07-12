import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime, timezone

def extract_number(text):
    """Extract the first number from text, handling commas and spaces"""
    if not text or not isinstance(text, str):
        return None
    # Remove commas and spaces
    cleaned = ''.join(c for c in text if c.isdigit())
    try:
        return int(cleaned) if cleaned else None
    except ValueError:
        return None

def fetch_topmate_stats():
    try:
        # Fetch the Topmate profile page
        response = requests.get('https://topmate.io/tharun_polu')
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Initialize stats with default values
        stats = {
            'bookings': 699,  # default value
            'reviews': 87,    # default value
            'rating': 4.8,    # default value
            'last_updated': datetime.now(timezone.utc).isoformat(),
        }
        
        # Extract stats
        # Find all text containing "sales"
        total_bookings = 0
        sales_texts = soup.find_all(string=lambda text: isinstance(text, str) and 'sales' in text.lower())
        for text in sales_texts:
            num = extract_number(text)
            if num and num < 1000000:  # Sanity check - no more than 1M sales
                total_bookings += num
        
        if total_bookings > 0:
            stats['bookings'] = total_bookings
        
        # Find reviews count
        reviews_element = soup.find(string=lambda text: isinstance(text, str) and 'Testimonials' in text)
        if reviews_element:
            num = extract_number(reviews_element)
            if num and num < 10000:  # Sanity check - no more than 10K reviews
                stats['reviews'] = num
        
        # Find rating
        rating_elements = soup.find_all(string=lambda text: isinstance(text, str) and '/5' in text)
        for text in rating_elements:
            try:
                # Extract number before "/5"
                rating = float(text.strip().split('/')[0])
                if 0 <= rating <= 5:  # Valid rating range
                    stats['rating'] = rating
                    break
            except (ValueError, IndexError):
                continue
        
        print(f"Successfully fetched stats: {stats}")
        return stats
    
    except Exception as e:
        print(f"Error fetching stats: {e}")
        # Return default values if fetch fails
        return {
            'bookings': 699,
            'reviews': 87,
            'rating': 4.8,
            'last_updated': datetime.now(timezone.utc).isoformat(),
        }

def update_stats_file():
    stats = fetch_topmate_stats()
    
    # Validate stats before saving
    if not isinstance(stats['bookings'], (int, float)) or stats['bookings'] < 0:
        stats['bookings'] = 699
    if not isinstance(stats['reviews'], (int, float)) or stats['reviews'] < 0:
        stats['reviews'] = 87
    if not isinstance(stats['rating'], (int, float)) or not 0 <= stats['rating'] <= 5:
        stats['rating'] = 4.8
    
    # Create assets/data directory if it doesn't exist
    os.makedirs('assets/data', exist_ok=True)
    
    # Write stats to JSON file
    with open('assets/data/topmate_stats.json', 'w') as f:
        json.dump(stats, f, indent=2)
    
    print("Stats updated successfully:", stats)

if __name__ == "__main__":
    update_stats_file() 