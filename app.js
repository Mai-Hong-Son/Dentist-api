import createError from "http-errors";
import express from "express";
import logger from "morgan";
import cors from "cors";

import router from "./routes";

import passportInitialize from "./authenticates";
import { middleware as aclMiddleware } from './acl';
import locale from "./middlewares/locale";
import fileUpload from 'express-fileupload';

var app = express();

// common middlewares
// app.set('views', path.join(__dirname, 'views'));
app.disable("x-powered-by");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(locale);

app.use(passportInitialize);
app.use(aclMiddleware());
app.use(fileUpload());
app.use(express.static('public'))

app.use(router);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (process.env.NODE_ENV == 'development') {
    console.log('err', err); // JSON.stringify(err));
  }

  // render the error page
  // if validate
  if (err.message === "Validation failed") {
    return res.status(422).json({
      errors: err.mapped(),
    })
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({
      message: 'INVALID_JWT',
    })
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(400).json({
      message: 'TOKEN_EXPIRED',
    })
  }

  res.status(err.status || 500).json({
    message: err.message,
  })
});

export default app;
