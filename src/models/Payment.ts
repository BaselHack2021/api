import { Schema, model } from 'mongoose';
import { Payment } from '../interfaces/models';

const schema = new Schema<Payment>({
    amount: { type: Number, required: true },
    description: String,
    festival: { type: Schema.Types.ObjectId, ref: 'Festival' },
    status: { type: String, enum: ["insufficientBalance", "insufficientAge", "accepted"], required: true }
})

const PaymentModel = model<Payment>('Payment', schema);
