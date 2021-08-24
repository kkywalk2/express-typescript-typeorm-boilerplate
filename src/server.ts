import express from 'express'
import passport from 'passport'

import AccountController from './controller/Account'
import PassportConfig from './passport/Passport'
import {ExceptionMiddleware} from './exception/ExceptionHandler'

// Create express server
const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

app.use("/Accounts", AccountController);

app.use(passport.initialize());
app.use(ExceptionMiddleware);
PassportConfig()

export default app;