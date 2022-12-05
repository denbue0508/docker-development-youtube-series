import config from '../config/config';
import { response } from 'express';

const verifyToken = async (req, res, next): Promise<any> => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      let isValidToken = false;

      switch (req.method) {
        case "GET":
          isValidToken = config.ENV_GET_KEY == token;
          break;
        case "POST":
          isValidToken = config.SECRET_TOKEN == token;
          break;
      }

      return isValidToken ? next() : res.status(403).send({ success: false, message: 'Not authorized' });
    } else {
      return res.status(403).send({ success: false, message: 'No token provided.' });
    }
  } catch (err) {
    res.status(500).send({ auth: false, message: err.message });
  }
};

export default verifyToken;
