import { Schema, model } from 'mongoose';
import { QRCode } from '@baselhack2021/interfaces/models';

const schema = new Schema<QRCode>({
  user: { type: Schema.Types.ObjectId, ref: 'FestivalUser' },
});

const QRCodeModel = model<QRCode>('QRCode', schema);

const getQRCodeById = (id: String) => QRCodeModel.findById(id, null).exec();

const linkQRCode = (qrCodeID: String, qrCodeObject: QRCode) => {
  // eslint-disable-next-line no-underscore-dangle
  console.log("Linking");
  QRCodeModel.findByIdAndUpdate(qrCodeID, qrCodeObject, { new: true }, (err) => console.log(err));
};

const getAllQRCodes = () => QRCodeModel.find().populate('user');

export { getQRCodeById, linkQRCode, getAllQRCodes };
