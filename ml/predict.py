import sys
import json
import joblib
import pandas as pd
import warnings


warnings.filterwarnings("ignore", category=UserWarning)

model = joblib.load("ml/stress_model.pkl")
encoder = joblib.load("ml/encoder.pkl")
cat_cols = joblib.load("ml/cat_cols.pkl")
feature_names = joblib.load("ml/feature_names.pkl")  


try:
    input_data = json.load(sys.stdin)
except Exception as e:
    print(json.dumps({"error": f"Invalid input: {str(e)}"}))
    sys.exit(1)


df = pd.DataFrame([input_data])


for col in cat_cols:
    if col not in df.columns:
        df[col] = "Unknown"


encoded_array = encoder.transform(df[cat_cols])
encoded_df = pd.DataFrame(
    encoded_array.toarray() if hasattr(encoded_array, "toarray") else encoded_array,
    columns=encoder.get_feature_names_out(cat_cols)
)


df_final = df.drop(cat_cols, axis=1).reset_index(drop=True)
df_final = pd.concat([df_final, encoded_df], axis=1)


df_final = df_final.reindex(columns=feature_names, fill_value=0)


prediction = model.predict(df_final)[0]


label_map = {0: "Low", 1: "Medium", 2: "High"}
output = {"prediction": label_map.get(prediction, "Unknown")}


print(json.dumps(output))
