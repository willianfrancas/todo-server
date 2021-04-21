import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    username: String,
    // 'address': String,
    // 'city': String,
    // 'state': String,
    // 'phone': String,
    mobilephone: String,
    email: String,
    password: String,
  }
);
const UserMon = mongoose.model('User', UserSchema);
export default UserMon;
// module.exports =
// export default UserSchema = mongoose.model('User', UserSchema);