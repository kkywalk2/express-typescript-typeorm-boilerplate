import * as express from 'express';
import userController from './controller/user'

// Create express server
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

app.use("/User",userController)

export default app;