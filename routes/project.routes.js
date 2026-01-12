import express from "express";
import upload from "../middleware/upload.middleware.js";
import { getAllProjects, uploadProject } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadProject);
router.get("/", getAllProjects);
export default router;
