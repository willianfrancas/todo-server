import mongoose from 'mongoose';
import crypto from 'crypto';
const Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        password: {
            type: String,
            require: true,
            select: false,
            set: value => crypto.
                createHash('md5')
                .update(value)
                .digest('hex')
        },
        email: {
            type: String,
            require: true,
            unique: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true }

    }
);
export const User = mongoose.model('User', userSchema);
// module.exports = mongoose.model('User', userSchema);