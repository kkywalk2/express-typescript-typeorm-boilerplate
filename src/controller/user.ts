import * as express from 'express';
import User from "../entity/user"

let router = express.Router()

router.get('/GetAllUsers', function(req, res, next) {
    console.log("Called GetAllUsers");
    res.send(User.find())
});

export default router