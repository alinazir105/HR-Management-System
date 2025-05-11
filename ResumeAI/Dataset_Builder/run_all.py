from clean_data import preprocess_data;
from load_data import load_data;
from match_data import calculate_scores;
from save_data import save_results;
from balance_data import balance_data;

resumes, job_descriptions = load_data('./Data/Resume.csv', './Data/Jobs.csv')
preprocessed_resumes = preprocess_data(resumes)
preprocessed_job_descriptions = preprocess_data(job_descriptions)
resumes, job_descriptions = balance_data(preprocessed_resumes, preprocessed_job_descriptions)
print(f"Total cleaned resumes: {len(resumes)}")
print(f"Total cleaned job descriptions: {len(job_descriptions)}")
results = calculate_scores(resumes, job_descriptions)
save_results(results)