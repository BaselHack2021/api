import { Schema, model } from 'mongoose';
import { Payment } from '../interfaces/models';

const schema = new Schema<Payment>({
  amount: { type: Number, required: true },
  description: String,
  festival: { type: Schema.Types.ObjectId, ref: 'Festival' },
  festivalUser: { type: Schema.Types.ObjectId, ref: 'Festivaluser', required: true },
  status: { type: String, enum: ['insufficientBalance', 'insufficientAge', 'accepted'], required: true },
});

const PaymentModel = model<Payment>('Payment', schema);

const createPayment = async (transactionObj: any) => PaymentModel.create(transactionObj);

export {
  createPayment,
};
