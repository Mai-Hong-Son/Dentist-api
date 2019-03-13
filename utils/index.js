import createError from 'http-errors';
import path from 'path';
import { User } from 'app/models';
import moment from 'moment';


export const nextCatch = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (e) {
      next(e);
    }
  }
}

export const throwIfNull = (data) => {
  if (!data) {
    throw createError.NotFound();
  }

  return data;
};


export const isImage = ({ name }) => {
  var extension = (path.extname(name)).toLowerCase();
  switch (extension) {
    case '.jpg':
      return '.jpg';
    case '.jpeg':
      return '.jpeg';
    case '.png':
      return '.png';
    default:
      return false;
  }
}


// HH:MM:SS
export const isTime = (value) => {
  var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])(:[0-5][0-9])?$/.test(value);
  return isValid;
}

export const isDate = (value) => moment(value, 'YYYY-MM-DD').isValid()