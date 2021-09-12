import { Schema, model } from 'mongoose';
import { Payment } from '@baselhack2021/interfaces/models';
import { getFestivalUserById, updateFestivalUserById } from './FestivalUser';

const schema = new Schema<Payment>({
  amount: { type: Number, required: true },
  description: String,
  festivalUser: { type: Schema.Types.ObjectId, ref: 'Festivaluser', required: true },
});

const PaymentModel = model<Payment>('Payment', schema);

const createTransaction = async (transactionObj: any) => {
  const { amount } = transactionObj;
  const user = await getFestivalUserById(transactionObj.festivalUser);
  const currentBalance = user.balance;

  if (Math.sign(amount) === -1) {
    if (currentBalance - (amount * -1) >= 0) {
      console.log(currentBalance - amount)
      const newBalance = currentBalance + transactionObj.amount;
      updateFestivalUserById(transactionObj.festivalUser, { balance: newBalance });
      return PaymentModel.create(transactionObj);
    }
    return 'insufficientBalance';
  }
  const newBalance = currentBalance + transactionObj.amount;
  updateFestivalUserById(transactionObj.festivalUser, { balance: newBalance });
  return PaymentModel.create(transactionObj);
};

export {
  createTransaction,
};
