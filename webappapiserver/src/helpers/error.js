class CustomErrors extends Error {
    constructor(message, code) {
        super()
        this.statusMessage = message
        this.statusCode = code
    }
}

export class NotFoundError extends CustomErrors { }
export class AuthError extends CustomErrors { }
