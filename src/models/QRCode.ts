import { Schema, model } from 'mongoose';
import { QRCode } from '../interfaces/models';

const schema = new Schema<QRCode>({
    user: { type: Schema.Types.ObjectId, ref: 'FestivalUser', required: true }
})

const QRCodeModel = model<QRCode>('QRCode', schema);

const linkQRCode = (qrCodeId: String, userObj: any) => {
    QRCodeModel.findByIdAndUpdate(qrCodeId, userObj, { new: true }, (err: any, QRCode: any) => {
        return err ? err : QRCode
    })
}

export { linkQRCode }