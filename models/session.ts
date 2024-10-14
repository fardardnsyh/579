import mongoose, { model, models, ObjectId, Schema } from 'mongoose';
import { Document } from 'mongoose';

export interface SessionInterface extends Pick<Document, '_id'> {
  user_id: mongoose.Types.ObjectId;
  session_id: string;
  expiresAt: Date;
}

export interface SessionSchemaInterface extends Document {
  user_id: mongoose.Types.ObjectId;
  session_id: string;
  expiresAt: Date;
}

const sessionSchema: Schema<SessionSchemaInterface> = new Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    session_id: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      // default: () => Date.now(),
      // expires: 60 * 60,
      default: () => Date.now() + 1000 * 60 * 60,
      expires: 0,
      // immutable: true,
    },
  },
  { timestamps: true }
);

const Session = models.Session || model('Session', sessionSchema);

export default Session;
