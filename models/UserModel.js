import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    username: String,
    mobilephone: String,
    email: String,
    password: String,
  }
);
const User = mongoose.model('User', UserSchema);
export default User;
// module.exports =
// export default UserSchema = mongoose.model('User', UserSchema);