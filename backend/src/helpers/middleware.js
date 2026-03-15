export const globalErrorHandler = (err, req, res, next) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }

    if (err.isFromExternalServer) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }

    if (err.status == 401 && err.code == 'invalid_token'){
        return res.status(err.status).json({
            status: err.status,
            message: err.message
        })
    }

    res.status(500).json({
        status: "error",
        message: "Something went wrong"
    })
}   