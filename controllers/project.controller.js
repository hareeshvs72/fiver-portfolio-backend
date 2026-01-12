import Project from "../models/Project.model.js";
import cloudinary from "../config/cloudinary.js";

export const uploadProject = async (req, res) => {
  try {
    const { title, description, tags, liveUrl, codeUrl } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio-projects",
    });

    const project = await Project.create({
      title,
      description,
      tags: JSON.parse(tags),
      liveUrl,
      codeUrl,
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
