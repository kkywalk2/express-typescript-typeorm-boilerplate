import passport from 'passport'
import passportJwt from 'passport-jwt'
import bcrypt from 'bcrypt'
import strategy from 'passport-local'

import user from '../entity/user'

const localStrategy = strategy.Strategy
const jwtStrategy = passportJwt.Strategy
const { ExtractJwt } = passportJwt

const LocalStrategyOption = {
    usernameField: "accountname",
    passwordField: "password",
}

const jwtStrategyOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'asdadsadasdasdsasd',
}

export default () => {
    passport.use(new localStrategy(LocalStrategyOption,
        async (accountname, password, done) => {
            let userData;
            try {
                userData = await user.findOne({ accountName : accountname, passWord : password })
                if (!userData) return done(null, false)
                //const isSamePassword = await bcrypt.compare(password, userData.passWord)
                //if (!isSamePassword) return done(null, false)
                if (password != userData.passWord) return done(null, false)
            } catch (e) {
                done(e)
            }
            return done(null, user)
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
            return done(null, user);
        }))
}