import mongoose, { Document, model, models, ObjectId, Schema } from 'mongoose';

export interface MessageInterface extends Pick<Document, '_id'> {
  user_id: ObjectId;
  message: string;
  getsDeletedAt: Date;
  createdAt: Date;
}

export interface MessageSchemaInterface extends Document {
  user_id: ObjectId;
  message: string;
  getsDeletedAt: Date;
}

const messageSchema: Schema<MessageSchemaInterface> = new Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    getsDeletedAt: {
      type: Date,
      default: () => Date.now() + 1000 * 60 * 60 * 24 * 2,
      expires: 0,
    },
  },
  { timestamps: true }
);

const Message = models.Message || model('Message', messageSchema);

export default Message;
