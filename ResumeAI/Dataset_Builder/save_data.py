import pandas as pd

def save_results(results, output_path='./Data/Match_Scores.csv'):
    df = pd.DataFrame(results)
    df.to_csv(output_path, index=False)
    print(f"Saved match scores to {output_path}")
