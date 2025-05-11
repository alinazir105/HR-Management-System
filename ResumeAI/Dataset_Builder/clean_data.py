import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

nltk.download('stopwords', quiet=True)
nltk.download('punkt', quiet=True)
nltk.download('wordnet', quiet=True)

lemmatizer = WordNetLemmatizer()

stop_words = set(stopwords.words('english'))

def clean_text(text):
    if not isinstance(text, str):
        return ""
    
    text = text.lower()
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'[^\x00-\x7F]+', '', text)
    
    words = word_tokenize(text)
    filtered = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    
    return ' '.join(filtered).strip()

def preprocess_data(texts):
    print("Preprocessing data...")
    texts = list(set(texts))
    return [clean_text(t) for t in texts]
