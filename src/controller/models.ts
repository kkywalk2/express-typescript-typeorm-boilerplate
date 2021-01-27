export class SignInReq {
    accountName :string
    passWord : string

    constructor(accountName : string = "", passWord : string = "")
    {
        this.accountName = accountName
        this.passWord = passWord
    }
}

export class SignInRes {
    status : string

    constructor(status : string = "")
    {
        this.status = status
    }
}