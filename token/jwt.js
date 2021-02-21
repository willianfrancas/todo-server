import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const randomSecret = crypto.randomBytes(64).toString('hex');

export const sign = payload => jwt.sign(payload, randomSecret, { expiresIn: 86400 });
export const verify = token => jwt.verify(token, randomSecret);

