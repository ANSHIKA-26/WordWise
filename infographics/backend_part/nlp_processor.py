import spacy

nlp = spacy.load("en_core_web_sm")  # Load the English NLP model

def identify_complex_words(text):
    complex_words = []
    doc = nlp(text)
    for token in doc:
        if len(token.text) > 7:  # Define what "complex" means
            complex_words.append(token.text)
    return complex_words
