import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from "../entity/user"

let router = express.Router()

router.get('/GetAllUsers', async function (req, res, next) {
    console.log("Called GetAllUsers");
    let user = await User.findByInfo("test","test")
    res.send(user[0])
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
                'asdadsadasdasdsasd', // 나만의 시크릿키
                { expiresIn: "5m" } // 토큰 만료 시간
            );
            return res.json({ token });
        });
    })(req, res);
})

export default router