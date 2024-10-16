from flask import Blueprint, jsonify
import requests

api = Blueprint('api', __name__)

@api.route('/word/<string:word>', methods=['GET'])
def get_word_data(word):
    """
    Fetches data for the given word, including definition and synonyms.
    """
    # Example dictionary API URL
    # You should replace this with a valid API that provides word data.
    api_url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"

    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Raise an error for bad responses

        word_data = response.json()
        
        # Structure the data you want to return
        # You can modify this according to the API's response structure
        result = {
            "word": word_data[0]['word'],
            "definition": word_data[0]['meanings'][0]['definitions'][0]['definition'],
            "examples": word_data[0]['meanings'][0]['definitions'][0].get('example', 'No example available'),
            "synonyms": word_data[0].get('synonyms', [])
        }

        return jsonify(result), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 404
