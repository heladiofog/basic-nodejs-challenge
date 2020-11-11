import mongoose from 'mongoose';

const CakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name of the cake is required',
    unique: 'This cake has been already registered',
  },
  price: {
    type: Number,
    default: 99.99,
  },
  flavors: {
    type: [String],
  },
});

export default mongoose.model('Cake', CakeSchema);
