import { Schema, model } from 'mongoose';
import { Festival } from '../interfaces/models';

const schema = new Schema<Festival>({
    name: { type: String, required: true },
    description: String,
    location: String
})

const FestivalModel = model<Festival>('Festival', schema)

const getFestivalById = async (id: string) => {
    return FestivalModel.findById(id).exec();
}

const getAllFestivals = async () => {
    return FestivalModel.find();
}


const createFestival = async (festivalObj: any) => {
    return FestivalModel.create(festivalObj)
}

const updateFestivalByID = async (id: String, festivalObj: any) => {
    return FestivalModel.findByIdAndUpdate(id, festivalObj, { new: true })
}

export {
    getFestivalById,
    getAllFestivals,
    createFestival,
    updateFestivalByID
}
