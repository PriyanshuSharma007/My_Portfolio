import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  type: 'Degree' | 'Certification';
  title: string;
  institution: string;
  period?: string;
  award?: string;
  gpax?: string;
  details?: string[];
  issueDate?: Date;
  credentialUrl?: string;
}

const EducationSchema: Schema = new Schema({
  type: { type: String, enum: ['Degree', 'Certification'], required: true },
  title: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String },
  award: { type: String },
  gpax: { type: String },
  details: [{ type: String }],
  issueDate: { type: Date },
  credentialUrl: { type: String }
});

export default mongoose.model<IEducation>('Education', EducationSchema);
