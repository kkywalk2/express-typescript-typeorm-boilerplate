import passport from 'passport'
import passportJwt from 'passport-jwt'
import bcrypt from 'bcrypt'
import strategy from 'passport-local'

import { Container } from 'typedi';
import AccountService from "../service/Account";

const localStrategy = strategy.Strategy
const jwtStrategy = passportJwt.Strategy
const { ExtractJwt } = passportJwt

const LocalStrategyOption = {
    usernameField: "accountName",
    passwordField: "password",
}

const jwtStrategyOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

export default () => {
    passport.use(new localStrategy(LocalStrategyOption,
        async (accountName, password, done) => {
            let accountData;
            try {
                const accountServiceInstance = Container.get(AccountService);
                accountData = await accountServiceInstance.GetAccountByName(accountName);
                if (!accountData) return done(null, false);
                const isSamePassword = await bcrypt.compare(password, accountData.password);
                if (!isSamePassword) return done(null, false);
                return done(null, accountData);
            } catch (e) {
                done(e)
            }
        }))

    passport.use(new jwtStrategy(jwtStrategyOption,
        async (payload, done) => {
            let accountData;
            try {
                const accountServiceInstance = Container.get(AccountService);
                accountData = await accountServiceInstance.GetAccountById(payload.id);
                if (!accountData) return done(null, false);
                return done(null, accountData);
            } catch (e) {
                return done(e);
            }
        }))
}