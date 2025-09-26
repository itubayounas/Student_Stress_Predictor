import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import InputField from "./InputField";
import SelectField from "./SelectField";

const StressForm = () => {
	const [formData, setFormData] = useState({
		"Your Academic Stage": "",
		"Peer pressure": "",
		"Academic pressure from your home": "",
		"Study Environment": "",
		"What coping strategy you use as a student?": "",
		"Do you have any bad habits like smoking, drinking on a daily basis?":
			"",
		"What would you rate the academic  competition in your student life":
			"",
	});

	const [prediction, setPrediction] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setPrediction("");

		try {
			const res = await axios.post(
				"http://127.0.0.1:5000/api/predict",
				formData
			);
			setPrediction(res.data.prediction);
		} catch (err) {
			console.error("Prediction error:", err);
			setError("⚠️ Unable to fetch prediction. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 px-4">
			<motion.div
				className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-10 flex flex-col justify-center items-center"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
					🎓 Student Stress Predictor
				</h2>

				<form
					onSubmit={handleSubmit}
					className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900 w-full"
				>
					{/* Your Academic Stage */}
					<SelectField
						label="Your Academic Stage"
						name="Your Academic Stage"
						value={formData["Your Academic Stage"]}
						onChange={handleChange}
						options={["undergraduate", "post-graduate", "school"]}
					/>

					{/* Study Environment */}
					<SelectField
						label="Study Environment"
						name="Study Environment"
						value={formData["Study Environment"]}
						onChange={handleChange}
						options={["Peaceful", "Noisy", "Average"]}
					/>

					{/* Peer pressure */}
					<SelectField
						label="Peer pressure"
						name="Peer pressure"
						value={formData["Peer pressure"]}
						onChange={handleChange}
						options={[1, 2, 3, 4, 5]} // numeric scale from dataset
					/>

					{/* Academic pressure from your home */}
					<SelectField
						label="Academic pressure from your home"
						name="Academic pressure from your home"
						value={formData["Academic pressure from your home"]}
						onChange={handleChange}
						options={[1, 2, 3, 4, 5]} // numeric scale from dataset
					/>

					{/* Academic competition */}
					<SelectField
						label="Academic competition in your student life"
						name="What would you rate the academic  competition in your student life"
						value={
							formData[
								"What would you rate the academic  competition in your student life"
							]
						}
						onChange={handleChange}
						options={[1, 2, 3, 4, 5]} // numeric scale from dataset
					/>

					{/* Coping strategy */}
					<SelectField
						label="Coping strategy"
						name="What coping strategy you use as a student?"
						value={
							formData[
								"What coping strategy you use as a student?"
							]
						}
						onChange={handleChange}
						options={[
							"Analyze the situation and handle it intelligently",
							"Social support (friends, family)",
							"Emotional breakdown (crying a lot)",
							"Other",
						]}
					/>

					{/* Bad habits */}
					<SelectField
						label="Bad habits (smoking, drinking daily)"
						name="Do you have any bad habits like smoking, drinking on a daily basis?"
						value={
							formData[
								"Do you have any bad habits like smoking, drinking on a daily basis?"
							]
						}
						onChange={handleChange}
						options={["Yes", "No", "prefer not to say"]}
					/>

					{/* Submit Button */}
					<div className="col-span-1 md:col-span-2 flex justify-center">
						<button
							type="submit"
							disabled={loading}
							className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 transition transform hover:scale-105 w-1/2"
						>
							{loading ? "Loading..." : "Predict Stress"}
						</button>
					</div>
				</form>

				{/* Error Message */}
				<AnimatePresence>
					{error && (
						<motion.p
							className="mt-4 text-red-600 font-semibold text-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							{error}
						</motion.p>
					)}
				</AnimatePresence>

				{/* Prediction Result */}
				<AnimatePresence>
					{prediction && (
						<motion.div
							className="mt-8 text-center"
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<h3 className="text-xl font-bold text-gray-900">
								Predicted Stress Level:
							</h3>
							<motion.p
								className="text-3xl text-indigo-700 font-extrabold mt-3"
								initial={{ y: 10, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.2 }}
							>
								{prediction}
							</motion.p>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
};

export default StressForm;
