import mongoose from 'mongoose';
import { IBook } from './book.interface';

const Book = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a book name.'],
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IBook & mongoose.Document>('Book', Book);
