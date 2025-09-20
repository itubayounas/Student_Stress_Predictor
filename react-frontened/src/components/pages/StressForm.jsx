import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import InputField from "./InputField";
import SelectField from "./SelectField";

const StressForm = () => {
	const [formData, setFormData] = useState({
		Age: "",
		Gender: "",
		"Your Academic Stage": "",
		"Study Environment": "",
		"Are you suffering from any disease?": "",
		"Do you do physical exercise daily?": "",
		"Do you feel family pressure regarding your studies?": "",
		"Do you have a proper diet?": "",
		"What would you rate the academic  competition in your stude": "",
		"Academic pressure from your home": "",
		"Peer pressure": "",
		"What coping strategy you use as a student?": "",
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
			console.log(res.data.prediction)
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
				className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl p-10 flex flex-col justify-center items-center"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				{/* Heading */}
				<h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
					🎓 Student Stress Predictor
				</h2>

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-900 w-full"
				>
					{/* Row 1 */}
					<InputField
						label="Age"
						name="Age"
						type="number"
						value={formData.Age}
						onChange={handleChange}
					/>
					<SelectField
						label="Gender"
						name="Gender"
						value={formData.Gender}
						onChange={handleChange}
						options={["Male", "Female", "Other"]}
					/>

					{/* Row 2 */}
					<SelectField
						label="Your Academic Stage"
						name="Your Academic Stage"
						value={formData["Your Academic Stage"]}
						onChange={handleChange}
						options={["School", "College", "University"]}
					/>
					<SelectField
						label="Study Environment"
						name="Study Environment"
						value={formData["Study Environment"]}
						onChange={handleChange}
						options={["Good", "Average", "Poor"]}
					/>

					{/* Row 3 */}
					<SelectField
						label="Do you do physical exercise daily?"
						name="Do you do physical exercise daily?"
						value={formData["Do you do physical exercise daily?"]}
						onChange={handleChange}
						options={["Yes", "No"]}
					/>
					<SelectField
						label="Do you feel family pressure regarding your studies?"
						name="Do you feel family pressure regarding your studies?"
						value={
							formData[
								"Do you feel family pressure regarding your studies?"
							]
						}
						onChange={handleChange}
						options={["Yes", "No"]}
					/>

					{/* Row 4 */}
					<SelectField
						label="Do you have a proper diet?"
						name="Do you have a proper diet?"
						value={formData["Do you have a proper diet?"]}
						onChange={handleChange}
						options={["Yes", "No"]}
					/>
					<SelectField
						label="Are you suffering from any disease?"
						name="Are you suffering from any disease?"
						value={formData["Are you suffering from any disease?"]}
						onChange={handleChange}
						options={["Yes", "No"]}
					/>

					{/* Row 5 */}
					<SelectField
						label="Academic pressure from your home"
						name="Academic pressure from your home"
						value={formData["Academic pressure from your home"]}
						onChange={handleChange}
						options={["High", "Moderate", "Low"]}
					/>
					<SelectField
						label="Peer pressure"
						name="Peer pressure"
						value={formData["Peer pressure"]}
						onChange={handleChange}
						options={["High", "Moderate", "Low"]}
					/>

					{/* Row 6 */}
					<SelectField
						label="Academic competition in your studies"
						name="What would you rate the academic  competition in your stude"
						value={
							formData[
								"What would you rate the academic  competition in your stude"
							]
						}
						onChange={handleChange}
						options={["High", "Moderate", "Low"]}
					/>
					<SelectField
						label="Coping strategy"
						name="What coping strategy you use as a student?"
						value={
							formData[
								"What coping strategy you use as a student?"
							]
						}
						onChange={handleChange}
						options={["Relaxation", "Time management", "Other"]}
					/>

					{/* Submit Button */}
					<div className="col-span-1 md:col-span-2 flex justify-center">
						<button
							type="submit"
							disabled={loading}
							className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 transition transform hover:scale-105 w-1/2"
						>
							{loading ? (
								<motion.div
									className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"
									initial={{ rotate: 0 }}
									animate={{ rotate: 360 }}
									transition={{
										repeat: Infinity,
										duration: 1,
										ease: "linear",
									}}
								/>
							) : (
								"Predict Stress"
							)}
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
