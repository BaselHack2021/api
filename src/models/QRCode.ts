import { Schema, model } from 'mongoose';
import { QRCode } from '../interfaces/models';

const schema = new Schema<QRCode>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    festival: { type: Schema.Types.ObjectId, ref: 'Festival' }
})

const QRCodeModel = model<QRCode>('QRCode', schema);
