import passport from 'passport';

import basicStrategy from './basic';
import bearerStrategy from './bearer';
import facebookStrategy from './facebook';
import googleStrategy from './google';

import manageStrategy from './manage';
import authStrategy from './auth';

passport.use(basicStrategy);
passport.use(bearerStrategy);
passport.use(facebookStrategy);
passport.use(googleStrategy);

// admin
passport.use(manageStrategy);
passport.use('auth', authStrategy);

export default passport.initialize();