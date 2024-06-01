import { Schema, Document } from 'mongoose';

export const ImageSchema = new Schema({
  url: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
});

export interface Image extends Document {
  id: string;
  url: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
