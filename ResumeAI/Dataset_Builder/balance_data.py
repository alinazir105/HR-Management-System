import random

def balance_data(resumes, job_descriptions, max_jd=3000):
    if len(job_descriptions) > max_jd:
        job_descriptions = random.sample(job_descriptions, max_jd)
    return resumes, job_descriptions