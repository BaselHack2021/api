import { Schema, model } from 'mongoose';
import { Payment } from '@baselhack2021/interfaces/models';
import { getFestivalUserById, updateFestivalUserById } from './FestivalUser';

const schema = new Schema<Payment>({
  amount: { type: Number, required: true },
  description: String,
  festival: { type: Schema.Types.ObjectId, ref: 'Festival' },
  festivalUser: { type: Schema.Types.ObjectId, ref: 'Festivaluser', required: true },
  status: { type: String, enum: ['insufficientBalance', 'insufficientAge', 'accepted'], required: true },
});

const PaymentModel = model<Payment>('Payment', schema);

const createTransaction = async (transactionObj: any) => {
  const { amount } = transactionObj;
  const currentBalance = await getFestivalUserById(transactionObj.festivalUser).execute();

  if (currentBalance >= amount) {
    const newBalance = currentBalance + transactionObj.amount;
    await updateFestivalUserById(transactionObj.festivalUser, { balance: newBalance });
    return PaymentModel.create(transactionObj);
  }

  return 'insufficientBalance';

};

const getTransactionsOfUserById = async (userId: String) => {
  PaymentModel.find({ festivalUser: userId }).exec();
}

export {
  createTransaction,
  getTransactionsOfUserById,
};
