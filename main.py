from flask import Flask, request, jsonify
from transformers import AutoModelForSequenceClassification, AutoTokenizer

app = Flask(__name__)

# Load your chosen model
model = AutoModelForSequenceClassification.from_pretrained("valurank/distilbert-allsides")
tokenizer = AutoTokenizer.from_pretrained("valurank/distilbert-allsides")

@app.route('/')
def predict():
    data = request.get_json(force=True)
    inputs = tokenizer(data['texts'], padding=True, truncation=True, return_tensors="pt")
    outputs = model(**inputs)
    predictions = outputs.logits.argmax(-1)
    return jsonify(predictions.tolist())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
