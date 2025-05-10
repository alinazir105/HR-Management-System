from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from sentence_transformers import SentenceTransformer
import joblib
import numpy as np
from parser import parse_resume
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load your models
model = SentenceTransformer('./Model/resume_jd_match_model')
regressor = joblib.load('./Model/resume_jd_match_model.pkl')

@app.route('/upload', methods=['POST'])
def upload_file():

    file = request.files['file']
    job_description = request.form['job']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the uploaded file
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    print(f"File saved at: {filepath}") 

    try:
        # Parse the resume (adjust this function as needed to extract text from the resume)
        resume_text = parse_resume(filepath)
        os.remove(filepath)

        # Encode the resume and job description
        resume_embedding = model.encode([resume_text])
        jd_embedding = model.encode([job_description])

        # Combine the embeddings and predict the match score
        X = np.concatenate([resume_embedding, jd_embedding], axis=1)
        match_score = regressor.predict(X)[0]

        match_score = float(match_score)


        return jsonify({
            'match_score': round(match_score, 2),
            'resume': resume_text,
        })

    except Exception as e:
        print(f"Error parsing resume: {str(e)}")  # Debugging: log error
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000)
