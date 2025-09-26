import express from "express";
import cors from "cors";
import { router } from "./backend/routes/apiRoutes/router.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use router
app.use("/api", router);

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
});
