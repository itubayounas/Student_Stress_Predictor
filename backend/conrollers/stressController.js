import { spawn } from "child_process";
import path from "path";

const __dirname = process.cwd();

export const predictStress = (req, res) => {
	try {
		console.log("📥 Received input from frontend:", req.body);

		const pythonProcess = spawn("python", [
			path.join(__dirname, "ml", "predict.py"),
		]);

		// Send frontend data to Python via stdin
		pythonProcess.stdin.write(JSON.stringify(req.body));
		pythonProcess.stdin.end();

		let result = "";

		pythonProcess.stdout.on("data", (data) => {
			console.log("🐍 Python Output:", data.toString());
			result += data.toString();
		});

		pythonProcess.stderr.on("data", (data) => {
			console.error("🐍 Python Error:", data.toString());
		});

		pythonProcess.on("close", () => {
			try {
				const parsed = JSON.parse(result);
				res.json(parsed);
			} catch (err) {
				console.error("❌ JSON parse error:", err.message);
				res.status(500).json({ error: "Invalid JSON from Python" });
			}
		});
	} catch (err) {
		console.error("Prediction Error:", err);
		res.status(500).json({ error: "Prediction failed" });
	}
};
