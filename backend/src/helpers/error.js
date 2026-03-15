export class AppError extends Error {
    constructor(message, statusCode) {
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

export class ExternalAppError extends Error {
    constructor(message, statusCode) {
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
        this.isFromExternalServer = true

        Error.captureStackTrace(this, this.constructor)
    }
}
