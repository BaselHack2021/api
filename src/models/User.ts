import { model, Schema } from 'mongoose';
import { User } from '@baselhack2021/interfaces/models';

const schema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  status: {
    type: String, enum: ['unverified', 'verified'], required: true, default: 'unverified',
  },
  gender: { type: Boolean, required: true },
});

const UserModel = model<User>('User', schema);

const getUserById = async (id: string) => UserModel.findById(id).exec();

const getAllUsers = async () => UserModel.find();

const createUser = async (userObj: any) => UserModel.create(userObj);

const updateUserById = async (id: String, userObj: any) => UserModel.findByIdAndUpdate(id, userObj, { new: true });

export {
  getUserById, getAllUsers, createUser, updateUserById,
};
