import express from "express";
import passport from "passport";
import { Container } from "typedi";
import AccountService from "../service/Account";
import { SignUpReq } from "./Request";
import {
  AccountsGetRes,
  AccountsSignInRes,
  AccountsSignUpRes,
} from "./Response";
import { WrapAsync, ExceptionInfo } from "../exception/ExceptionHandler";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

let router = express.Router();

router.get("/", async function (req, res, next) {
  passport.authenticate(
    "jwt",
    { session: false },
    async (err, account, info) => {
      if (err || !account) return res.status(400).end();
      const accountServiceInstance = Container.get(AccountService);
      const users = await accountServiceInstance.GetAllAccounts();
      return res.json(new AccountsGetRes("OK", users));
    }
  )(req, res);
});

router.post(
  "/SignIn",
  async (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, account, info) => {
      try {
        if (err || !account)
          throw new ExceptionInfo(400, "There is no such account");
        req.login(account, { session: false }, (error) => {
          if (error) next(error);
          const accountServiceInstance = Container.get(AccountService);
          const token = accountServiceInstance.GetJWTToken(account.id);
          return res.json(new AccountsSignInRes("OK", token));
        });
      } catch (info) {
        next(info);
      }
    })(req, res);
  }
);

router.post(
  "/SignUp",
  WrapAsync(async (req, res, next) => {
    const reqData = plainToClass(SignUpReq, req.body);
    const err = await validate(reqData);
    if (err.length != 0) throw new ExceptionInfo(400, err[0].constraints);

    const accountServiceInstance = Container.get(AccountService);
    const user = await accountServiceInstance.SignUp(
      reqData.accountName,
      reqData.password,
      reqData.email
    );

    return user === undefined
      ? res.json(new AccountsSignUpRes("Already Exist UserName"))
      : res.status(201).json(new AccountsSignUpRes("OK"));
  })
);

export default router;
