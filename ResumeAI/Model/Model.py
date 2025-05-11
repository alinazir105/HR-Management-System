import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.linear_model import RidgeCV
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from torch.utils.data import DataLoader, TensorDataset

# Load your CSV dataset
df = pd.read_csv('./Data/Match_Scores.csv')  # Path to your labeled resume-job dataset

# Use a strong yet fast SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L12-v2')  # Slightly stronger than L6-v2, still fast

# Get BERT embeddings for resumes and job descriptions
resume_embeddings = model.encode(df['resume'].tolist(), show_progress_bar=True, normalize_embeddings=True)
jd_embeddings = model.encode(df['job_description'].tolist(), show_progress_bar=True, normalize_embeddings=True)

# Element-wise absolute difference instead of just concatenating (helps regression)
X = np.abs(resume_embeddings - jd_embeddings)  # Better than just stacking both

# Target variable
y = df['match_score'].astype(float)

# Split into training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Use RidgeCV for automatic regularization strength tuning
regressor = RidgeCV(alphas=[0.1, 1.0, 10.0])
regressor.fit(X_train, y_train)

# Evaluate the model
y_pred = regressor.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", round(mse, 4))

# Save model and transformer
joblib.dump(regressor, './Model/resume_jd_match_model.pkl')
model.save('./Model/resume_jd_match_model')

print("Models saved successfully!")
