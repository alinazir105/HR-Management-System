import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np
import joblib

# Load your CSV dataset
df = pd.read_csv('./Data/Match_Scores.csv')  # replace with your actual path

# Load BERT model (you can use other models like 'all-MiniLM-L6-v2' too)
model = SentenceTransformer('all-MiniLM-L6-v2')

# Combine resume and job description embeddings
resume_embeddings = model.encode(df['resume'].tolist(), show_progress_bar=True)
jd_embeddings = model.encode(df['job_description'].tolist(), show_progress_bar=True)

# Concatenate the embeddings for each pair
X = np.concatenate([resume_embeddings, jd_embeddings], axis=1)
y = df['match_score'].astype(float)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a regression model
regressor = Ridge()
regressor.fit(X_train, y_train)

# Evaluate
y_pred = regressor.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", round(mse, 4))

# Save the regression model
joblib.dump(regressor, './Model/resume_jd_match_model.pkl')

# Save the SentenceTransformer model in the 'Model' folder
model.save('./Model/resume_jd_match_model')

print("Models saved successfully!")

