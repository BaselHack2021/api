import { Schema, model } from 'mongoose';
import { Festival } from '../interfaces/models';

const schema = new Schema<Festival>({
  name: { type: String, required: true },
  description: String,
  location: String,
});

const FestivalModel = model<Festival>('Festival', schema);

const getFestivalById = async (id: string) => FestivalModel.findById(id).exec();

const getAllFestivals = async () => FestivalModel.find();

const createFestival = async (festivalObj: any) => FestivalModel.create(festivalObj);

const updateFestivalByID = async (id: String, festivalObj: any) => FestivalModel.findByIdAndUpdate(id, festivalObj, { new: true });

export {
  getFestivalById,
  getAllFestivals,
  createFestival,
  updateFestivalByID,
};
