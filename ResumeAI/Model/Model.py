import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from torch.utils.data import DataLoader, TensorDataset

# Load your CSV dataset
df = pd.read_csv('./Data/Match_Scores.csv')  # replace with your actual path

# Load the pre-trained model (using a powerful one like RoBERTa)
model = SentenceTransformer('roberta-large-nli-stsb-mean-tokens')

# Combine resume and job description embeddings
resume_embeddings = model.encode(df['resume'].tolist(), show_progress_bar=True)
jd_embeddings = model.encode(df['job_description'].tolist(), show_progress_bar=True)

# Concatenate the embeddings for each pair
X = np.concatenate([resume_embeddings, jd_embeddings], axis=1)
y = df['match_score'].astype(float)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Convert to torch tensors for neural network training
X_train_tensor = torch.tensor(X_train, dtype=torch.float32)
X_test_tensor = torch.tensor(X_test, dtype=torch.float32)
y_train_tensor = torch.tensor(y_train.values, dtype=torch.float32).view(-1, 1)
y_test_tensor = torch.tensor(y_test.values, dtype=torch.float32).view(-1, 1)

# Define mini-batch DataLoader
batch_size = 32
train_dataset = TensorDataset(X_train_tensor, y_train_tensor)
test_dataset = TensorDataset(X_test_tensor, y_test_tensor)

train_dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
test_dataloader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

# Define a simplified neural network for regression
class ResumeJobNN(nn.Module):
    def __init__(self, input_dim):
        super(ResumeJobNN, self).__init__()
        self.fc1 = nn.Linear(input_dim, 128)  # Reduced number of neurons
        self.fc2 = nn.Linear(128, 64)         # Reduced number of neurons
        self.fc3 = nn.Linear(64, 1)           # Output layer
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Instantiate the model
input_dim = X_train.shape[1]  # Total size of embeddings
model_nn = ResumeJobNN(input_dim)

# Loss function and optimizer
criterion = nn.MSELoss()
optimizer = optim.Adam(model_nn.parameters(), lr=1e-4)

# Training loop with mini-batches
epochs = 1
for epoch in range(epochs):
    model_nn.train()
    for i, (inputs, labels) in enumerate(train_dataloader):
        optimizer.zero_grad()

        # Forward pass
        outputs = model_nn(inputs)
        loss = criterion(outputs, labels)

        # Backward pass and optimization
        loss.backward()
        optimizer.step()

        if (i + 1) % 10 == 0:  # Print loss every 10 batches
            print(f"Epoch [{epoch + 1}/{epochs}], Step [{i + 1}/{len(train_dataloader)}], Loss: {loss.item():.4f}")

# Evaluate the model
model_nn.eval()
with torch.no_grad():
    y_pred_tensor = model_nn(X_test_tensor)
    y_pred = y_pred_tensor.numpy()

# Calculate MSE
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", round(mse, 4))

# Save the trained model (Neural Network)
torch.save(model_nn.state_dict(), './Model/resume_jd_nn_model.pth')

# Save the SentenceTransformer model
model.save('./Model/sentence_transformer_model')

print("Models saved successfully!")
