import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  category: string;
  subcategory?: string;
  technologies: {
    name: string;
    iconUrl?: string;
  }[];
}

const SkillSchema: Schema = new Schema({
  category: { type: String, required: true },
  subcategory: { type: String },
  technologies: [{
    name: { type: String, required: true },
    iconUrl: { type: String }
  }]
});

export default mongoose.model<ISkill>('Skill', SkillSchema);
