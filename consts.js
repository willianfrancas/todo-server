import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const consts = {
  bcryptSalts: 10,
  jwtKey: process.env.JWT_KEY,
  jwtExpire: 7200
}

export default consts;