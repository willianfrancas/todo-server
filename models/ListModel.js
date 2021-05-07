import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  done: Boolean,
  description: String,
  price: Number,
  id: String,
  owner: String,
});

const List = mongoose.model('List', ListSchema);
export default List;
