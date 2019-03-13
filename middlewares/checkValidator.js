import initialValidator from 'express-validator';
import { validationResult } from "express-validator/check";
import path from 'path';

export default (req, res, next) => {
  const errors = validationResult(req)
    .formatWith(({ location, msg, param, value, nestedErrors }) => msg)
    .throw();
  next();
};