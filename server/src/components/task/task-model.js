import mongoose from "mongoose"

const { Schema } = mongoose

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

export default Task

