import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: true, // default to public
    },
    metadata: {
      type: Object, // optional metadata (like IP, device info, etc.)
      default: {},
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
)

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)
export default Message
