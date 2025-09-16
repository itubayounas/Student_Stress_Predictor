import express from "express";
import cors from "cors";
import { spawn } from "child_process";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/api/predict", (req, res) => {
	const py = spawn("python", ["ml/predict.py"]);

	
	py.stdin.write(JSON.stringify(req.body));
	py.stdin.end();

	let data = "";
	py.stdout.on("data", (chunk) => {
		data += chunk.toString();
	});

	py.on("close", () => {
		try {
			const result = JSON.parse(data); 
			res.json(result); 
		} catch (err) {
			res.status(500).json({
				error: "Prediction failed",
				details: err.message,
			});
		}
	});
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
});
