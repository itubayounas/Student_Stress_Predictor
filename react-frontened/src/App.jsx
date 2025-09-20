import AnimatedBackground from "./components/layout/AnimatedBackground";
import StressForm from "./components/pages/StressForm";

function App() {
	return (
		<div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
			{/* Animated background */}
			<AnimatedBackground />

			{/* StressForm already has its own container */}
			<div className="relative z-10 w-full flex justify-center items-center">
				<StressForm />
			</div>
		</div>
	);
}

export default App;
