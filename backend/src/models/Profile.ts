import mongoose, { Schema, Document } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  localName?: string;
  username?: string;
  headline: string;
  summary: string;
  aboutText: string;
  quote?: string;
  profilePictureUrl?: string;
  resumeUrl: string;
  email?: string;
  codingProfiles: {
    github?: string;
    leetcode?: string;
    linkedin?: string;
    facebook?: string;
  };
}

const ProfileSchema: Schema = new Schema({
  name: { type: String, required: true },
  localName: { type: String },
  username: { type: String },
  email: { type: String },
  headline: { type: String, required: true },
  summary: { type: String, required: true },
  aboutText: { type: String, required: true },
  quote: { type: String },
  profilePictureUrl: { type: String },
  resumeUrl: { type: String, required: true },
  codingProfiles: {
    github: { type: String },
    leetcode: { type: String },
    linkedin: { type: String },
    facebook: { type: String }
  }
});

export default mongoose.model<IProfile>('Profile', ProfileSchema);
