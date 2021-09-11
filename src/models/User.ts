import { Schema, model, connect, ObjectId } from 'mongoose';
import { User } from '../interfaces/models';

const schema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    status: { type: String, enum: ["unverified", "verified"], required: true }
})

const UserModel = model<User>('User', schema);
