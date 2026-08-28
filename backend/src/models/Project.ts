import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  thumbnailUrl: string;
  techStack: string[];
  date?: string;
  status?: string;
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  techStack: [{ type: String }],
  date: { type: String },
  status: { type: String, default: 'Active' },
  liveDemoUrl: { type: String },
  sourceCodeUrl: { type: String }
});

export default mongoose.model<IProject>('Project', ProjectSchema);
