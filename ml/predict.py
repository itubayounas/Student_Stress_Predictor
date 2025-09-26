import sys
import json
import joblib
import pandas as pd
import warnings

warnings.filterwarnings("ignore", category=UserWarning)

# ==============================
# Load Preprocessor + Model
# ==============================
try:
    preprocessor = joblib.load("ml/stress_preprocessor.pkl")
    model = joblib.load("ml/stress_rf_model.pkl")
except Exception as e:
    print(json.dumps({"error": f"Failed to load model or preprocessor: {str(e)}"}))
    sys.exit(1)

# ==============================
# Step 1: Read input JSON
# ==============================
try:
    input_data = json.load(sys.stdin)   # Expecting dict from Node.js
except Exception as e:
    print(json.dumps({"error": f"Invalid input: {str(e)}"}))
    sys.exit(1)

# Convert to DataFrame
df = pd.DataFrame([input_data])

# ==============================
# Step 2: Apply Preprocessing
# ==============================
try:
    X_processed = preprocessor.transform(df)
except Exception as e:
    print(json.dumps({"error": f"Preprocessing failed: {str(e)}"}))
    sys.exit(1)

# ==============================
# Step 3: Predict Stress Level
# ==============================
try:
    prediction = model.predict(X_processed)[0]
except Exception as e:
    print(json.dumps({"error": f"Prediction failed: {str(e)}"}))
    sys.exit(1)

# ==============================
# Step 4: Return JSON Output
# ==============================
output = {"prediction": str(prediction)}  # Already "Low", "Medium", or "High"
print(json.dumps(output))
