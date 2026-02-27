class CustomErrors extends Error {
    constructor({message, code}) {
        super()
        this.message = message
        this.code = code
    }
}

export class NotFoundError extends CustomErrors{}
export class AuthError extends CustomErrors{}
