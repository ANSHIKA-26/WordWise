from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as palm
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load API key from .env file
load_dotenv()
palm_api_key = os.getenv('PALM_API_KEY')  # Get your API key from environment variable
if not palm_api_key:
    raise ValueError("API key is missing. Please set your API key in the environment variables.")
palm.configure(api_key=palm_api_key)

@app.route('/generate_trending_titles', methods=['GET'])
def generate_trending_titles():
    try:
        # Define a prompt to generate 10 trending blog titles
        prompt = """
        You are a content generator specialized in creating catchy and engaging blog titles. 
        Please generate 20 trending blog titles that would appeal to a broad audience in the current time. 
        The titles should be innovative, popular, and attention-grabbing.
        """

        # Make sure to use the correct method from the library
        model = palm.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)

        # Assuming the response contains a string of blog titles separated by newlines
        blog_titles = response.text.strip().split("\n")
        
        # Returning the blog titles as a JSON response
        return jsonify({"trending_titles": blog_titles[:10]}), 200
    
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred while generating the blog titles."}), 500


@app.route('/analyze', methods=['GET'])
def health_check():
    return jsonify({"message": "Server running!"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=8000)  # Ensure it's on port 8000
