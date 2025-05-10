import pandas as pd

def load_data(resume_path, jd_path):
    print("Loading file data...")
    # Read the CSV files
    resumes_df = pd.read_csv(resume_path, encoding='ISO-8859-1',low_memory=False)
    job_descriptions_df = pd.read_csv(jd_path, encoding='ISO-8859-1')

    resumes = resumes_df.iloc[:, 0].dropna().astype(str).tolist() 
    job_descriptions = job_descriptions_df.iloc[:, 0].dropna().astype(str).tolist()

    return resumes, job_descriptions
