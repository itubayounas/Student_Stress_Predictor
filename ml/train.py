import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib
import os


df = pd.read_csv("academic Stress level - maintainance 1.csv")


if "Timestamp" in df.columns:
    df = df.drop(columns="Timestamp")

# Encode categorical columns
cat_cols = df.select_dtypes(include="object").columns
ohe = OneHotEncoder(drop="first", sparse_output=False, handle_unknown="ignore")
encoded_array = ohe.fit_transform(df[cat_cols])
encoded_df = pd.DataFrame(encoded_array, columns=ohe.get_feature_names_out(cat_cols))

# Combine
df_encoded = df.drop(cat_cols, axis=1).reset_index(drop=True)
df_encoded = pd.concat([df_encoded, encoded_df], axis=1)

# Map stress index
def map_stress(x):
    if x in [1, 2]:
        return 0
    elif x == 3:
        return 1
    else:
        return 2

df_encoded["Stress_Level"] = df["Rate your academic stress index "].apply(map_stress)

# Features & target
X = df_encoded.drop("Stress_Level", axis=1)
y = df_encoded["Stress_Level"]

# Train/test split
x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train logistic regression
lr = LogisticRegression(max_iter=1000)
lr.fit(x_train, y_train)

# Save model, encoder, categorical cols, and feature names
os.makedirs("ml", exist_ok=True)
joblib.dump(lr, "ml/stress_model.pkl")
joblib.dump(ohe, "ml/encoder.pkl")
joblib.dump(list(cat_cols), "ml/cat_cols.pkl")       
joblib.dump(list(X.columns), "ml/feature_names.pkl") 

print(" Model and encoder retrained & saved in ./ml/")
