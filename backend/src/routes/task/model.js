import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  title: String,
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
});

const Task= mongoose.model('Task', taskSchema);
export default Task;
