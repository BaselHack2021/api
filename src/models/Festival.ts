import { Schema, model } from 'mongoose';
import { Festival } from '../interfaces/models';

const schema = new Schema<Festival>({
    name: { type: String, required: true },
    description: String,
    location: String
})

const FestivalModel = model<Festival>('Festival', schema)
