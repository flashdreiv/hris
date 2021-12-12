import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "dotenv/config";

//Routes
import routes from "./routes/index.js";

mongoose.connect(process.env.DB_CONNECTION);
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.listen(8000, () => console.log("server running on port 8000"));
