from sentence_transformers import SentenceTransformer, util
import torch

def calculate_scores(resumes, job_descriptions):
    print("Matching data...")
    model = SentenceTransformer('paraphrase-MiniLM-L3-v2')  # smaller and faster model

    # Encode with batching and show progress bar
    resume_embeddings = model.encode(resumes, batch_size=32, show_progress_bar=True)
    jd_embeddings = model.encode(job_descriptions, batch_size=32, show_progress_bar=True)

    # Compute cosine similarity
    scores = util.cos_sim(resume_embeddings, jd_embeddings)

    # Get the best matches and their corresponding scores
    best_matches = scores.argmax(axis=1)  # Index of the best match for each resume
    best_scores = scores.max(axis=1)  # The best score for each resume

    # best_scores is a namedtuple, we need to extract the actual values
    best_scores = best_scores.values 

    results = []
    for i in range(len(resumes)):
        match_score = best_scores[i].item() if isinstance(best_scores[i], torch.Tensor) else best_scores[i]
        
        results.append({
            "resume": resumes[i],
            "job_description": job_descriptions[best_matches[i]],
            "match_score": round(match_score, 2)
        })

    return results
