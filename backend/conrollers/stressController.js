import { spawn } from "child_process";
import path from "path";

const __dirname = process.cwd();

export const predictStress = (req, res) => {
	try {
		const features = req.body; // user input from frontend

		const pythonProcess = spawn("python", [
			path.join(__dirname, "ml", "predict.py"),
			JSON.stringify(features),
		]);

		let result = "";
		pythonProcess.stdout.on("data", (data) => {
			result += data.toString();
		});

		pythonProcess.stderr.on("data", (data) => {
			console.error("Python Error:", data.toString());
		});

		pythonProcess.on("close", () => {
			res.json({ prediction: result.trim() });
		});
	} catch (err) {
		console.error("Prediction Error:", err);
		res.status(500).json({ error: "Prediction failed" });
	}
};
