import Projects from "../models/Project.model.js";
import cloudinary from "../config/cloudinary.js";

export const uploadProject = async (req, res) => {
  console.log("inside uploadProject ");
  
  try {
    const { title, description, tags, liveUrl, codeUrl,category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio-projects",
    });

    const project = await  Projects.create({
      title,
      description,
      tags: JSON.parse(tags),
      liveUrl,
      codeUrl,
      category,
      imageUrl: uploadResult.secure_url,
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllProjects = async (req, res) => {
  console.log("inside getAllProjects");
  
  try {
    const project = await Projects.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: project.length,
      project,
    });
  } catch (error) {
    console.error("Get all projects error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};