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
        prompt = """
        You are a content generator specialized in creating catchy and engaging blog titles. 
        Please generate 20 trending blog titles that would appeal to a broad audience in the current time. 
        The titles should be innovative, popular, and attention-grabbing.
        """
        model = palm.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        blog_titles = response.text.strip().split("\n")
        return jsonify({"trending_titles": blog_titles[:10]}), 200
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred while generating the blog titles."}), 500

# New endpoint to generate content based on the title
@app.route('/generate-content', methods=['POST'])
def generate_content():
    try:
        # Get the title and summary from the request
        data = request.get_json()
        title = data.get('title', '')
        summary = data.get('summary', '')

        # Check if both title and summary are provided
        if not title and not summary:
            return jsonify({"error": "Title and summary are required"}), 400

        # Define a prompt using the title and summary to generate content
        prompt = (
                    f"Write a detailed and informative blog post on the topic: '{title}'. "
                    f"Use the following summary as a reference: '{summary}'. "
                    "Make it engaging and informative, and elaborate based on the provided summary in 200 words."
                    "Generate the output in the following format: "
                    "<Content of the blog post here(in single paragraph of about 150 words)>"
                    "<5 category in single line each category should be comma seperated>"
                    "<3 tags in single line each tags should be comma seperated>"
                )



        # Call the generative model with the title and summary prompt
        model = palm.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)

        # Extract the generated content
        content = response.text.strip() if response and response.text else "No content generated."

        # Return the content as a JSON response
        return jsonify({"content": content}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred while generating the content."}), 500

    
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred while generating the content."}), 500

@app.route('/analyze', methods=['GET'])
def health_check():
    return jsonify({"message": "Server running!"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=8000)
