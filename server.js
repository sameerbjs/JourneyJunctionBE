import express from "express";
import { connectDB } from "./db/index.js";
import cors from "cors";
import { PORT } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { router } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use("/api", router);
connectDB();
app.use(errorHandler);
app.listen(PORT, console.log(`Backend is running on port: ${PORT}`));
