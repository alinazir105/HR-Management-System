import joblib
from sentence_transformers import SentenceTransformer
import numpy as np

loaded_model = joblib.load('./Model/resume_jd_match_model.pkl')
loaded_transformer = SentenceTransformer('./Model/resume_jd_match_model')

# Sample resume and job description (change these for testing)
sample_resume = "Experienced Python developer with a background in data analysis and backend systems."
sample_jd = "Experienced Python developer Required"

# Encode and compute absolute difference
resume_emb = loaded_transformer.encode([sample_resume], normalize_embeddings=True)
jd_emb = loaded_transformer.encode([sample_jd], normalize_embeddings=True)
sample_input = np.abs(resume_emb - jd_emb)

# Predict match score
predicted_score = loaded_model.predict(sample_input)[0]
print(f"Predicted Match Score: {round(predicted_score, 2)}")