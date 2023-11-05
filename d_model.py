# Load model directly
from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("valurank/distilbert-allsides")
model = AutoModelForSequenceClassification.from_pretrained("valurank/distilbert-allsides")

model.save_pretrained("./model")
tokenizer.save_pretrained("./model")