from flask import Flask, request, jsonify
from transformers import T5Tokenizer, T5ForConditionalGeneration
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

model_name = "deep-learning-analytics/GrammarCorrector"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

@app.route('/grammar-correct', methods=['POST'])
def grammar_correct():
    data = request.json
    input_text = data.get('text', '')

    input_ids = tokenizer(f"grammar: {input_text}", return_tensors="pt").input_ids

   
    outputs = model.generate(input_ids, max_length=256, num_beams=5, early_stopping=True)
    corrected_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    
    return jsonify({'corrected_text': corrected_text})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
