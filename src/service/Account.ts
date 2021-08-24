import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ExceptionInfo } from "../exception/ExceptionHandler";
import { Repository } from 'typeorm';
import { Service } from "typedi";
import { InjectRepository } from 'typeorm-typedi-extensions';
import { validate } from 'class-validator';
import AccountModel from "../entity/Account";

@Service()
export default class AccountService {
  @InjectRepository(AccountModel)
  private accountRepository: Repository<AccountModel>;

  constructor(@InjectRepository(AccountModel) private constructorRepository: Repository<AccountModel>) { }

  async SignUp(accountName: string, password: string, email: string = "") {
    const account = await this.accountRepository.findOne({ name: accountName });
    if (account === undefined) {
      const hashed = await bcrypt.hash(password, 1);
      const newAccount = new AccountModel();
      newAccount.name = accountName;
      newAccount.password = hashed;
      newAccount.email = email;
      const err = await validate(newAccount);
      if (err.length == 0) {
        await this.accountRepository.save(newAccount);
        return newAccount;
      }else{
        throw new ExceptionInfo(400,err[0].constraints);
      }
    } else return undefined;
  }

  async GetAllAccounts() {
    return await this.accountRepository.find();
  }

  async GetAccountById(id: number) {
    return await this.accountRepository.findOne({ id: id })
  }

  async GetAccountByName(name: string) {
    return await this.accountRepository.findOne({ name: name })
  }

  GetJWTToken(id: number) {
    return jwt.sign(
      {
        id: id,
      }, // 토큰에 입력할 private 값
      process.env.JWT_SECRET!, // 나만의 시크릿키
      { expiresIn: "5m" } // 토큰 만료 시간
    );
  }
}
