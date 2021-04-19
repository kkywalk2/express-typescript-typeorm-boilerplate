import passport from 'passport'
import passportJwt from 'passport-jwt'
import bcrypt from 'bcrypt'
import strategy from 'passport-local'

import user from '../entity/user'

const localStrategy = strategy.Strategy
const jwtStrategy = passportJwt.Strategy
const { ExtractJwt } = passportJwt

const LocalStrategyOption = {
    usernameField: "accountName",
    passwordField: "passWord",
}

const jwtStrategyOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

export default () => {
    passport.use(new localStrategy(LocalStrategyOption,
        async (accountname, password, done) => {
            let userData;
            try {
                userData = await user.findOne({ accountName : accountname })
                if (!userData) return done(null, false)
                const isSamePassword = await bcrypt.compare(password, userData.passWord)
                if (!isSamePassword) return done(null, false)
            } catch (e) {
                done(e)
            }
            return done(null, userData)
        }))

    passport.use(new jwtStrategy(jwtStrategyOption,
        async (payload, done) => {
            let userData;
            try {
                userData = await user.findOne({ uid: payload.uid });
                if (!userData) return done(null, false);
            } catch (e) {
                return done(e);
            }
            return done(null, userData);
        }))
}