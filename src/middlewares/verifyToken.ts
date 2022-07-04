import jwt from "jsonwebtoken";
import { INVALID_TOKEN, TOKEN_MUST_BE_SENT } from "../commons/errors";
import { CustomError } from "../models/CustomError";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) TOKEN_MUST_BE_SENT();

  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decodedToken) {
    if (err) INVALID_TOKEN();

    req.user = decodedToken.user;
    next();
  });
};
