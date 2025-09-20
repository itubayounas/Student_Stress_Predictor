// src/components/AnimatedBackground.jsx
import { motion } from "framer-motion";

const AnimatedBackground = () => {
	const blobs = [
		{
			color: "from-pink-400 via-fuchsia-500 to-purple-500",
			size: "w-[28rem] h-[28rem]",
			x: -200,
			y: -100,
			delay: 0,
		},
		{
			color: "from-indigo-400 via-blue-500 to-cyan-400",
			size: "w-[30rem] h-[30rem]",
			x: 250,
			y: 50,
			delay: 1,
		},
		{
			color: "from-yellow-300 via-orange-400 to-red-400",
			size: "w-[34rem] h-[34rem]",
			x: -100,
			y: 200,
			delay: 2,
		},
	];

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-tr from-gray-100 via-white to-gray-50">
			{/* Soft radial gradient overlay */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),transparent)]" />

			{/* Animated blobs */}
			{blobs.map((blob, idx) => (
				<motion.div
					key={idx}
					className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-40 bg-gradient-to-r ${blob.color} ${blob.size}`}
					initial={{ x: blob.x, y: blob.y }}
					animate={{
						x: [blob.x, blob.x + 120, blob.x - 120, blob.x],
						y: [blob.y, blob.y + 80, blob.y - 80, blob.y],
						scale: [1, 1.1, 0.9, 1],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						repeatType: "mirror",
						ease: "easeInOut",
						delay: blob.delay,
					}}
				/>
			))}
		</div>
	);
};

export default AnimatedBackground;
