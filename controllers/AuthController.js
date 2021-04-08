import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import consts from '../consts.js';

const AuthController = {

  register: async function (req, res) {
    try {
      let user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        const newUser = new UserModel(req.body);
        newUser.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
        await newUser.save();
        delete newUser.password;
        res.status(200).json(newUser);
      } else {
        res.status(403).json({ message: 'E-mail ja cadastrado!', error: {} });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro durante o cadastro!', error: error });
    }
  },

  login: function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    UserModel.findOne({ email: email }).lean().exec(function (error, user) {
      if (error) {
        return res.status(500).json({ message: 'Erro no servidor', error: error })
      }
      const authError = (password == "" || password == null || !user);
      if (!authError && bcrypt.compareSync(password, user.password)) {
        let token = jwt.sign({ _id: user._id }, consts.jwtKey, { expiresIn: consts.jwtExpire });
        delete user.password;
        
        return res.status(200).json({ ...user, token });
      }
      return res.status(500).json({ message: 'Usuario: email ou senha incorreto', error: 'message' })
    })
  },

  checkToken: function (req, res, next) {
    const token = req.get('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado!' });
    }
    jwt.verify(token, consts.jwtKey,
      (error, decoded) => {
        if (error || !decoded) {
          return res.status(401).json({ message: 'Token errado. Falha na autenticação' })
        }
        next();
      })
  },

  userData: (req, res) => {
    const token = req.get('Authorization');
    jwt.verify(token, consts.jwtKey,
      (error, decoded) => {
        const id = decoded._id;

        UserModel.findById(id).lean().exec(function (error, user) {
          if (error || !user) {
            return res.status(500).json({ message: 'Erro ao tentar obter dados do usuário', error: error })
          }
          let token = jwt.sign({ _id: user._id }, consts.jwtKey, { expiresIn: consts.jwtExpire });
          delete user.password;
          return res.status(200).json({ ...user, token });
        })
      })
  }
}

export default AuthController;
// module.exports = AuthController;