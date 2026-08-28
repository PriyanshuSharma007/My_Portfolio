import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  jobTitle: string;
  company: string;
  employmentType?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isCurrentRole: boolean;
  responsibilities: string[];
}

const ExperienceSchema: Schema = new Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  employmentType: { type: String, default: 'Full-time' },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // Null signifies "Present"
  isCurrentRole: { type: Boolean, default: false },
  responsibilities: [{ type: String }]
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
