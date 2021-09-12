import { Schema, model } from 'mongoose';
import { FestivalUser } from '@baselhack2021/interfaces/models';

const schema = new Schema<FestivalUser>({
  festival: { type: Schema.Types.ObjectId, ref: 'Festival', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, required: true, default: 0 },
  role: {
    type: String, enum: ['visitor', 'employee', 'orgianisator'], required: true, default: 'visitor',
  },
  imageUrl: String,
});

const FestivalUserModel = model<FestivalUser>('FestivalUser', schema);

const getFestivalUserById = async (id: String) => FestivalUserModel.findById(id).populate('user').exec();

const createFestivaluser = async (festivalUserObj: any) => FestivalUserModel.create(festivalUserObj);

const updateFestivalUserById = async (festivalUserId: String, festivalUserObj: any) => {
  // eslint-disable-next-line no-underscore-dangle
  await FestivalUserModel.findByIdAndUpdate(festivalUserId, festivalUserObj, { new: true });
};

export {
  getFestivalUserById,
  createFestivaluser,
  updateFestivalUserById,
};
