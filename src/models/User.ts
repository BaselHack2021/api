import { model, Schema } from 'mongoose';
import { User } from '../interfaces/models';

const schema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  status: { type: String, enum: ['unverified', 'verified'], required: true, default: 'unverified' },
  gender: { type: Boolean, required: true },
});

const UserModel = model<User>('User', schema);

const getUserById = async (id: string) => {
  return UserModel.findById(id).exec();
};

const getAllUsers = async () => {
  return UserModel.find();
}

const createUser = async (userObj: any) => {
  return UserModel.create(userObj, (err: String, user: User) => {
    if (err) {
      return err;
    } else {
      return user;
    }
  });
};

const updateUserById = async (id: String, userObj: any) => {
  return UserModel.findByIdAndUpdate(id, userObj, { new: true }, (err: String, user: User) => {
    if (err) {
      return err;
    } else {
      return user;
    }
  })
}

export { getUserById, getAllUsers, createUser, updateUserById };
