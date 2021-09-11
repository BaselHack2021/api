import { Schema, model } from 'mongoose';
import { FestivalUser } from '../interfaces/models';

const schema = new Schema<FestivalUser>({
    festival: { type: Schema.Types.ObjectId, ref: 'Festival' },
    balance: { type: Number, required: true},
    role: { type: String, enum: ["visitor", "employee", "orgianisator"], required: true },
    imageUrl: String
})

const FestivalUserModel = model<FestivalUser>('FestivalUser', schema);
