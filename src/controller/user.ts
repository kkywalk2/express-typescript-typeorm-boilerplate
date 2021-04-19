import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from "../entity/user"
import { SignInReq, SignInRes } from "./models"

let router = express.Router()

router.get('/GetAllUsers', async function (req, res, next) {
    passport.authenticate("jwt", { session: false }, async (err, user, info) => {
        if (err || !user) return res.status(400).end();
        let users = await User.find()
        res.send(users)
    })(req, res);
});

router.post('/SignIn', (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) return res.status(400).end();
        req.login(user, { session: false }, (error) => {
            if (error) next(error);
            const token = jwt.sign(
                {
                    uid: user.uid,
                }, // 토큰에 입력할 private 값
                process.env.JWT_SECRET!, // 나만의 시크릿키
                { expiresIn: "5m" } // 토큰 만료 시간
            );
            return res.json({ token });
        });
    })(req, res);
})

router.post('/SignUp', async (req, res, next) => {
    const reqData = req.body as SignInReq
    if(reqData.accountName == undefined || reqData.passWord == undefined)
        return res.json(new SignInRes("Invalid Argument"))
    const user = await User.findOne({ accountName: reqData.accountName })
    if (user == undefined) {
        const hashed = await bcrypt.hash(reqData.passWord, 1)
        const newUser = new User()
        newUser.accountName = reqData.accountName
        newUser.passWord = hashed
        await newUser.save()
        return res.json(new SignInRes("OK"))
    } else {
        return res.json(new SignInRes("Already Exist UserName"))
    }
})

export default router