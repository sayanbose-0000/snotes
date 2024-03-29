import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true
    },
    date:{
      type: Date,
      required: true,
    },
    author: { // since author links this collection('notes') with 'users', we type like this
      type: Schema.Types.ObjectId, // used to link the two
      ref: 'users', // type the collection name we want to link to, here, 'users'
    }
  }
)

const PostModel = model('notes', PostSchema);

export default PostModel;