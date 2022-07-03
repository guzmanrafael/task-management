import jwt from "jsonwebtoken";
import { CustomError } from "../models/CustomError";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    throw new CustomError('Token must be sent', 400, '');
  }

  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decodedToken) {
    if (err) {
      throw new CustomError('Invalid token', 401, '');
    }

    req.user = decodedToken.user;
    next();
  });
};