import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Project= mongoose.model('Project', projectSchema);
export default Project;
