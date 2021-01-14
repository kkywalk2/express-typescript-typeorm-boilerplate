import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import userController from './controller/user'
import passportConfig from './passport/passport'

// Create express server
const app = express();
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

app.use("/User", userController)

app.use(passport.initialize());
passportConfig()

export default app;