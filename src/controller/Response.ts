import Account from '../entity/Account'

class FDSResponse {
    message: string

    constructor(message: string) {
        this.message = message
    }
}

export class ErrorResponse extends FDSResponse {
    constructor(message: string) {
        super(message)
    }
}

export class AccountsGetRes extends FDSResponse {
    data: Account[]

    constructor(message: string, data: Account[]) {
        super(message)
        this.data = data
    }
}

export class AccountsSignInRes extends FDSResponse {
    data: string

    constructor(message: string, data: string) {
        super(message)
        this.data = data
    }
}

export class AccountsSignUpRes extends FDSResponse {
    constructor(message: string) {
        super(message)
    }
}