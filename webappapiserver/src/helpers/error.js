export class CustomError extends Error {
    constructor(message, code) {
        super()
        this.statusMessage = message
        this.statusCode = code
    }
}
