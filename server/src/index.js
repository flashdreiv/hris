import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import cors from "cors";
import "dotenv/config";

//Routes
import routes from "./routes/index.js";

mongoose.connect(process.env.DB_CONNECTION);
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api", routes);

app.listen(8000, () => console.log("server running on port 8000"));
