import { Schema, model, connect, ObjectId } from 'mongoose';
import { User } from '../interfaces/models';

const schema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    status: { type: String, enum: ["unverified", "verified"], required: true, default: "unverified" }
})

const UserModel = model<User>('User', schema);

const getUserById = async (id: string) => {
    return UserModel.findById(id).exec();
}

const createUser = async (userObj: any) => {
    UserModel.create(userObj, (err: String, user: User) => {
        if (err) {
            return err;
        } else {
            return user
        }
    })
}

export {
    getUserById,
    createUser
}