import requests

def fetch_word_data(word):
    # Example API (replace with a real API endpoint)
    response = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
    if response.status_code == 200:
        return response.json()
    return None
