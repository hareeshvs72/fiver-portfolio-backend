import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/project.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors( {origin: ["http://localhost:5173", "https://myportfolio.vercel.app"],}));
app.use(express.json());

    app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/',(req,res)=>{
 res.send("<h1>Server Is running</h1>")
})