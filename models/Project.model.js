import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      index: true   // For searching by title
    },

    description: { 
      type: String, 
      required: true 
    },

    tags: { 
      type: [String], 
      index: true   // For filtering by tags
    },

    liveUrl: String,

    codeUrl: String,

    category: { 
      type: String,
      index: true   // For filtering by category
    },

    imageUrl: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true }
);

// Index for sorting newest projects faster
projectSchema.index({ createdAt: -1 });

export default mongoose.model("Projects", projectSchema);
