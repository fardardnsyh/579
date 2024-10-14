import mongoose, { Document, model, models, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface PasswordResetInterface extends Pick<Document, '_id'> {
  user_id: mongoose.Types.ObjectId;
  //   email: string;
  reset_string: string;
  expiresAt: Date;
}

interface PasswordResetSchemaInterface extends Document {
  user_id: mongoose.Types.ObjectId;
  //   email: string;
  reset_string: string;
  expiresAt: Date;
}

const passwordResetSchema: Schema<PasswordResetSchemaInterface> = new Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    // },
    reset_string: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => Date.now() + 1000 * 60 * 10,
      expires: 0,
      immutable: true,
    },
  },
  { timestamps: true }
);

passwordResetSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed_reset_string = await bcrypt.hash(this.reset_string, salt);

    this.reset_string = hashed_reset_string;
  } catch (error: any) {
    next(error);
  }

  next();
});

const PasswordReset =
  models.PasswordReset || model('PasswordReset', passwordResetSchema);

export default PasswordReset;
