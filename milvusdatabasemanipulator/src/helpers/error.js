export class AppError extends Error {
    constructor(message, statusCode) {

        const milvusMessage = 'Milvus Server Error: '+ message
        super(milvusMessage)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}
