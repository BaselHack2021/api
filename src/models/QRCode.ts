import { Schema, model } from 'mongoose';
import { QRCode } from '@baselhack2021/interfaces/models';

const schema = new Schema<QRCode>({
  user: { type: Schema.Types.ObjectId, ref: 'FestivalUser', required: true },
});

const QRCodeModel = model<QRCode>('QRCode', schema);

const linkQRCode = (qrCodeObject: QRCode) => {
  QRCodeModel.findByIdAndUpdate(qrCodeObject._id, qrCodeObject, { new: true });
};

export { linkQRCode };
